import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function EstimationManager() {
  const [estimations, setEstimations] = useState([]);
  const [newEstimation, setNewEstimation] = useState({
    projectTitle: "",
    ownerName: "",
    sections: [],
    totalEstimate: "",
  });

  const [section, setSection] = useState({
    title: "",
    note: "",
    items: [],
  });

  const [item, setItem] = useState({
    description: "",
    rate: "",
    qty: "",
    unit: "",
    amount: "",
    note: "",
  });

  useEffect(() => {
    fetchEstimations();
  }, []);

  const fetchEstimations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/estimations");
      setEstimations(res.data);
    } catch (err) {
      console.error("Error loading estimations:", err);
    }
  };

  const addItem = () => {
    if (!item.description || !item.rate)
      return alert("Please fill item details!");
    setSection({
      ...section,
      items: [...section.items, item],
    });
    setItem({ description: "", rate: "", qty: "", unit: "", amount: "", note: "" });
  };

  const addSection = () => {
    if (!section.title) return alert("Please enter section title!");
    setNewEstimation({
      ...newEstimation,
      sections: [...newEstimation.sections, section],
    });
    setSection({ title: "", note: "", items: [] });
  };

  const saveEstimation = async () => {
    try {
      await axios.post("http://localhost:5000/api/estimations", newEstimation);
      alert("✅ Estimation saved successfully!");
      setNewEstimation({
        projectTitle: "",
        ownerName: "",
        sections: [],
        totalEstimate: "",
      });
      fetchEstimations();
    } catch {
      alert("❌ Error saving estimation");
    }
  };

  const deleteEstimation = async (id) => {
    if (!window.confirm("Delete this estimation?")) return;
    await axios.delete(`http://localhost:5000/api/estimations/${id}`);
    fetchEstimations();
  };

  // 🧾 PDF Generator
  const generatePDF = (est) => {
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
    doc.text("DETAIL ESTIMATION", 220, 120);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 120);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Project: ${est.projectTitle || "-"}`, 40, 150);
    doc.text(`Owner: ${est.ownerName || "-"}`, 40, 170);

    let yPos = 190;

    est.sections.forEach((sec, sIdx) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`${sIdx + 1}] ${sec.title}`, 40, yPos);
      yPos += 10;

      const rows = sec.items.map((i, idx) => [
        idx + 1,
        i.description,
        i.rate,
        i.qty,
        i.unit,
        i.amount,
        i.note || "-",
      ]);

      autoTable(doc, {
        startY: yPos + 10,
        head: [["#", "Description", "Rate", "Qty", "Unit", "Amount", "Note"]],
        body: rows,
        styles: { fontSize: 9, halign: "center" },
        headStyles: { fillColor: [255, 200, 0], textColor: 0 },
      });

      yPos = doc.lastAutoTable.finalY + 15;
      if (sec.note) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.text(`Note: ${sec.note}`, 40, yPos);
        yPos += 20;
      }

      if (yPos > 700) {
        doc.addPage();
        yPos = 60;
      }
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total Estimate: Rs. ${est.totalEstimate || "0"}`, 40, yPos + 20);

    doc.setFont("helvetica", "normal");
    doc.line(40, 760, 550, 760);
    doc.setFontSize(10);
    doc.text("For AK Construction", 400, 780);
    doc.text("Authorized Signature", 400, 795);

    const safeTitle = est.projectTitle?.replace(/[^\w\s]/gi, "_") || "estimation";
    doc.save(`${safeTitle}_estimation.pdf`);
  };

  return (
    <div>
      <h3 className="text-warning mb-3">📊 Estimation Management</h3>

      {/* Project Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Project Title"
          value={newEstimation.projectTitle}
          onChange={(e) =>
            setNewEstimation({ ...newEstimation, projectTitle: e.target.value })
          }
        />
        <input
          className="form-control mb-2"
          placeholder="Owner Name"
          value={newEstimation.ownerName}
          onChange={(e) =>
            setNewEstimation({ ...newEstimation, ownerName: e.target.value })
          }
        />

        <hr />
        <h6 className="fw-bold">Add Section</h6>
        <input
          className="form-control mb-2"
          placeholder="Section Title (e.g., Foundation, Ground Floor)"
          value={section.title}
          onChange={(e) => setSection({ ...section, title: e.target.value })}
        />

        <h6 className="fw-bold mt-2">Add Item</h6>
        <div className="row g-2">
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Description"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
            />
          </div>
          <div className="col-md-1">
            <input
              className="form-control"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => setItem({ ...item, rate: e.target.value })}
            />
          </div>
          <div className="col-md-1">
            <input
              className="form-control"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => setItem({ ...item, qty: e.target.value })}
            />
          </div>
          <div className="col-md-1">
            <input
              className="form-control"
              placeholder="Unit"
              value={item.unit}
              onChange={(e) => setItem({ ...item, unit: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Amount"
              value={item.amount}
              onChange={(e) => setItem({ ...item, amount: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Note"
              value={item.note}
              onChange={(e) => setItem({ ...item, note: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-sm btn-success w-100" onClick={addItem}>
              ➕ Add Item
            </button>
          </div>
        </div>

        {section.items.length > 0 && (
          <table className="table table-sm mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Amount</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((it, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{it.description}</td>
                  <td>{it.rate}</td>
                  <td>{it.qty}</td>
                  <td>{it.unit}</td>
                  <td>{it.amount}</td>
                  <td>{it.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="text-end">
          <button className="btn btn-warning" onClick={addSection}>
            Save Section
          </button>
        </div>

        {newEstimation.sections.length > 0 && (
          <div className="mt-3">
            <h6>📋 Sections Added:</h6>
            {newEstimation.sections.map((s, i) => (
              <p key={i} className="mb-1">
                {i + 1}. {s.title} ({s.items.length} items)
              </p>
            ))}
          </div>
        )}

        <div className="text-end mt-3">
          <input
            className="form-control w-25 d-inline"
            placeholder="Total Estimate (Rs.)"
            value={newEstimation.totalEstimate}
            onChange={(e) =>
              setNewEstimation({
                ...newEstimation,
                totalEstimate: e.target.value,
              })
            }
          />
          <button className="btn btn-warning ms-2" onClick={saveEstimation}>
            Save Estimation
          </button>
        </div>
      </div>

      {/* Saved Estimations */}
      <h5 className="mb-2">📑 Saved Estimations</h5>
      {estimations.map((est) => (
        <div
          key={est._id}
          className="border rounded p-3 mb-3 bg-light shadow-sm"
        >
          <h6 className="fw-bold mb-1">{est.projectTitle}</h6>
          <p className="mb-1">Owner: {est.ownerName}</p>
          <p className="mb-1">Total: Rs. {est.totalEstimate}</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => generatePDF(est)}
            >
              📄 Download PDF
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteEstimation(est._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
