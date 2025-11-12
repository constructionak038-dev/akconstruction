import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function QuotationManager() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [quotations, setQuotations] = useState([]);
  const [newQuotation, setNewQuotation] = useState({
    projectTitle: "",
    ownerName: "",
    areaStatement: "",
    totalArea: "",
    note: "",
    items: [],
    totalAmount: "",
  });
  const [item, setItem] = useState({
    description: "",
    unit: "",
    area: "",
    rate: "",
    amount: "",
  });

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/quotations`);
      setQuotations(res.data);
    } catch (err) {
      console.error("Error loading quotations:", err);
    }
  };

  const addItem = () => {
    if (!item.description) return alert("Please fill item details!");
    setNewQuotation({
      ...newQuotation,
      items: [...newQuotation.items, item],
    });
    setItem({ description: "", unit: "", area: "", rate: "", amount: "" });
  };

  const saveQuotation = async () => {
    try {
      await axios.post(`${API_URL}/api/quotations`, newQuotation);
      alert("✅ Quotation added successfully!");
      setNewQuotation({
        projectTitle: "",
        ownerName: "",
        areaStatement: "",
        totalArea: "",
        note: "",
        items: [],
        totalAmount: "",
      });
      fetchQuotations();
    } catch {
      alert("❌ Error saving quotation");
    }
  };

  const deleteQuotation = async (id) => {
    if (!window.confirm("Delete this quotation?")) return;
    await axios.delete(`${API_URL}/api/quotations/${id}`);
    fetchQuotations();
  };

  // 🧾 Generate PDF
  const generatePDF = (q) => {
    const doc = new jsPDF("p", "pt", "a4");

    // 🏗️ Header
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

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("QUOTATION", 250, 120);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 120);

    // 🧱 Project Info
    doc.setFontSize(11);
    const details = [
      `Project: ${q.projectTitle || "-"}`,
      `Owner: ${q.ownerName || "-"}`,
      `Area Statement: ${q.areaStatement || "-"}`,
      `Total Area: ${q.totalArea || "-"}`,
    ];

    let yPos = 150;
    details.forEach((line) => {
      doc.text(line.replace(/&/g, "and"), 40, yPos);
      yPos += 20;
    });

    // 🧮 Table
    const rows = q.items.map((i, index) => [
      index + 1,
      i.description.replace(/&/g, "and"),
      i.unit,
      i.area,
      i.rate,
      i.amount,
    ]);

    autoTable(doc, {
      startY: yPos + 10,
      head: [["#", "Description", "Unit", "Area", "Rate", "Amount"]],
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, halign: "center", lineColor: [150, 150, 150] },
      headStyles: { fillColor: [255, 200, 0], textColor: 0 },
    });

    // 💰 Total Amount
    const finalY = doc.lastAutoTable.finalY + 25;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total Amount: Rs. ${q.totalAmount || "0"}`, 40, finalY); // ✅ changed ₹ → Rs.

    // 📝 Notes Section
    const noteY = finalY + 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Note:", 40, noteY);
    doc.setFontSize(10);
    doc.text(q.note?.replace(/&/g, "and") || "-", 70, noteY, {
      maxWidth: 460,
      align: "justify",
    });

    // ✍️ Footer
    doc.setDrawColor(0);
    doc.line(40, 760, 550, 760);
    doc.setFontSize(10);
    doc.text("For AK Construction", 400, 780);
    doc.text("Authorized Signature", 400, 795);

    // Save the PDF
    const safeTitle = q.projectTitle?.replace(/[^\w\s]/gi, "_") || "quotation";
    doc.save(`${safeTitle}_quotation.pdf`);
  };

  return (
    <div>
      <h3 className="text-warning mb-3">📄 Quotation Management</h3>

      {/* Add Quotation Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Project Title"
              value={newQuotation.projectTitle}
              onChange={(e) =>
                setNewQuotation({ ...newQuotation, projectTitle: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Owner Name"
              value={newQuotation.ownerName}
              onChange={(e) =>
                setNewQuotation({ ...newQuotation, ownerName: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Area Statement"
              value={newQuotation.areaStatement}
              onChange={(e) =>
                setNewQuotation({ ...newQuotation, areaStatement: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Total Area"
              value={newQuotation.totalArea}
              onChange={(e) =>
                setNewQuotation({ ...newQuotation, totalArea: e.target.value })
              }
            />
          </div>

          <div className="col-12 mb-3">
            <textarea
              className="form-control"
              placeholder="Note"
              rows="2"
              value={newQuotation.note}
              onChange={(e) =>
                setNewQuotation({ ...newQuotation, note: e.target.value })
              }
            />
          </div>
        </div>

        {/* Add Item */}
        <h6 className="mt-3 fw-bold">Add Item</h6>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              placeholder="Description"
              className="form-control"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              placeholder="Unit"
              className="form-control"
              value={item.unit}
              onChange={(e) => setItem({ ...item, unit: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              placeholder="Area"
              className="form-control"
              value={item.area}
              onChange={(e) => setItem({ ...item, area: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              placeholder="Rate"
              className="form-control"
              value={item.rate}
              onChange={(e) => setItem({ ...item, rate: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              placeholder="Amount"
              className="form-control"
              value={item.amount}
              onChange={(e) => setItem({ ...item, amount: e.target.value })}
            />
          </div>
          <div className="col-md-1">
            <button onClick={addItem} className="btn btn-sm btn-success w-100">
              ➕
            </button>
          </div>
        </div>

        {/* Item List */}
        {newQuotation.items.length > 0 && (
          <table className="table table-sm mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Area</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {newQuotation.items.map((it, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{it.description}</td>
                  <td>{it.unit}</td>
                  <td>{it.area}</td>
                  <td>{it.rate}</td>
                  <td>{it.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Save Button */}
        <div className="text-end mt-3">
          <input
            placeholder="Total Amount"
            className="form-control w-25 d-inline"
            value={newQuotation.totalAmount}
            onChange={(e) =>
              setNewQuotation({
                ...newQuotation,
                totalAmount: e.target.value,
              })
            }
          />
          <button onClick={saveQuotation} className="btn btn-warning ms-2">
            Save Quotation
          </button>
        </div>
      </div>

      {/* Quotation List */}
      <h5 className="mb-2">📜 Saved Quotations</h5>
      {quotations.map((q) => (
        <div
          key={q._id}
          className="border rounded p-3 mb-3 shadow-sm bg-light position-relative"
        >
          <h6 className="fw-bold mb-1">{q.projectTitle}</h6>
          <p className="mb-1">Owner: {q.ownerName}</p>
          <p className="mb-1">Total: Rs. {q.totalAmount}</p>

          <div className="d-flex gap-2 mt-2">
            <button
              onClick={() => generatePDF(q)}
              className="btn btn-sm btn-success"
            >
              📄 Download PDF
            </button>
            <button
              onClick={() => deleteQuotation(q._id)}
              className="btn btn-sm btn-danger"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

