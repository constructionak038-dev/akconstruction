import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PaymentScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    projectTitle: "",
    ownerName: "",
    items: [],
    totalAmount: "",
  });

  const [item, setItem] = useState({
    description: "",
    amount: "",
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      setSchedules(res.data);
    } catch (err) {
      console.error("Error loading payment schedules:", err);
    }
  };

  const addItem = () => {
    if (!item.description || !item.amount) {
      return alert("Please fill all fields!");
    }

    setNewSchedule({
      ...newSchedule,
      items: [...newSchedule.items, item],
    });

    setItem({ description: "", amount: "" });
  };

  const calculateTotal = () => {
    const total = newSchedule.items.reduce(
      (acc, curr) => acc + parseFloat(curr.amount || 0),
      0
    );
    return total.toLocaleString("en-IN");
  };

  const saveSchedule = async () => {
    try {
      const scheduleToSave = {
        ...newSchedule,
        totalAmount: calculateTotal(),
      };
      await axios.post("http://localhost:5000/api/payments", scheduleToSave);
      alert("✅ Payment Schedule Saved!");
      setNewSchedule({
        projectTitle: "",
        ownerName: "",
        items: [],
        totalAmount: "",
      });
      fetchSchedules();
    } catch {
      alert("❌ Error saving payment schedule");
    }
  };

  const deleteSchedule = async (id) => {
    if (!window.confirm("Delete this payment schedule?")) return;
    await axios.delete(`http://localhost:5000/api/payments/${id}`);
    fetchSchedules();
  };

  // 📄 Generate PDF
  const generatePDF = (s) => {
    const doc = new jsPDF("p", "pt", "a4");

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AK CONSTRUCTION", 40, 40);
    doc.setFontSize(11);
    doc.text("At Post Panderi, Tal: Mandangad, Dist: Ratnagiri", 40, 60);
    doc.text("Mob: 7276102921", 40, 75);
    doc.text("Email: arafatkazi094@gmail.com", 40, 90);

    doc.setDrawColor(255, 200, 0);
    doc.setLineWidth(1);
    doc.line(40, 100, 550, 100);

    doc.setFontSize(14);
    doc.text("PAYMENT SCHEDULE", 200, 120);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 120);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Project: ${s.projectTitle || "-"}`, 40, 150);
    doc.text(`Owner: ${s.ownerName || "-"}`, 40, 170);

    const rows = s.items.map((i, idx) => [
      idx + 1,
      i.description,
      `Rs. ${parseFloat(i.amount || 0).toLocaleString("en-IN")}`,
    ]);

    autoTable(doc, {
      startY: 190,
      head: [["Sr. No.", "Description", "Amount"]],
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
      headStyles: { fillColor: [255, 200, 0], textColor: 0 },
    });

    const finalY = doc.lastAutoTable.finalY + 25;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total: Rs. ${s.totalAmount}`, 40, finalY);

    doc.line(40, 760, 550, 760);
    doc.setFontSize(10);
    doc.text("For AK Construction", 400, 780);
    doc.text("Authorized Signature", 400, 795);

    const safeTitle = s.projectTitle?.replace(/[^\w\s]/gi, "_") || "payment_schedule";
    doc.save(`${safeTitle}_Payment_Schedule.pdf`);
  };

  return (
    <div>
      <h3 className="text-warning mb-3">💰 Payment Schedule Management</h3>

      <div className="card p-3 mb-4 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Project Title"
          value={newSchedule.projectTitle}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, projectTitle: e.target.value })
          }
        />
        <input
          className="form-control mb-2"
          placeholder="Owner Name"
          value={newSchedule.ownerName}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, ownerName: e.target.value })
          }
        />

        <div className="row g-2 mb-2">
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Description"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount (Rs.)"
              value={item.amount}
              onChange={(e) => setItem({ ...item, amount: e.target.value })}
            />
          </div>
          <div className="col-md-1">
            <button onClick={addItem} className="btn btn-success w-100">
              ➕
            </button>
          </div>
        </div>

        {newSchedule.items.length > 0 && (
          <table className="table table-sm mt-3">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Description</th>
                <th>Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {newSchedule.items.map((it, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{it.description}</td>
                  <td>{it.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="text-end mt-3">
          <h6>Total: Rs. {calculateTotal()}</h6>
          <button className="btn btn-warning" onClick={saveSchedule}>
            Save Payment Schedule
          </button>
        </div>
      </div>

      <h5 className="mb-2">📑 Saved Payment Schedules</h5>
      {schedules.map((s) => (
        <div
          key={s._id}
          className="border rounded p-3 mb-3 bg-light shadow-sm"
        >
          <h6 className="fw-bold mb-1">{s.projectTitle}</h6>
          <p className="mb-1">Owner: {s.ownerName}</p>
          <p className="mb-1">Total: Rs. {s.totalAmount}</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => generatePDF(s)}
            >
              📄 Download PDF
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteSchedule(s._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
