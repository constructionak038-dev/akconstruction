import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://akconstruction-backend.onrender.com";

export default function PlanningManager() {
  const [planning, setPlanning] = useState({
    projectType: "",
    floors: "",
    ownerName: "",
    engineerName: "",
    items: [],
  });

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
  });

  // Load planning data
  useEffect(() => {
    fetchPlanning();
  }, []);

  const fetchPlanning = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/planning`);
      if (res.data) setPlanning(res.data);
    } catch (err) {
      alert("Failed to load planning data");
    }
  };

  // Save Project Info
  const saveProjectInfo = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/planning/info`, {
        projectType: planning.projectType,
        floors: planning.floors,
        ownerName: planning.ownerName,
        engineerName: planning.engineerName,
      });
      setPlanning(res.data);
      alert("Project info saved!");
    } catch (err) {
      alert("Failed to save project info");
    }
  };

  // Add item
  const savePlanningItem = async () => {
    if (!newItem.title || !newItem.description)
      return alert("Please fill all fields!");

    try {
      const res = await axios.post(`${API_URL}/api/planning/item`, newItem);
      setPlanning(res.data);
      setNewItem({ title: "", description: "" });
    } catch (err) {
      alert("Failed to save item");
    }
  };

  // Delete item by index
  const deleteItem = async (index) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`${API_URL}/api/planning/item/${index}`);
      fetchPlanning();
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  // ⭐ PDF Generator
  const generatePDF = () => {
    const { projectType, floors, ownerName, engineerName, items } = planning;

    const doc = new jsPDF("p", "pt", "a4");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AK CONSTRUCTION", 40, 40);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("At Post Panderi, Tal: Mandangad, Dist: Ratnagiri", 40, 60);
    doc.text("Mob: 7276102921", 40, 75);
    doc.text("Email: arafatkazi094@gmail.com", 40, 90);

    doc.setDrawColor(255, 200, 0);
    doc.setLineWidth(1.2);
    doc.line(40, 105, 550, 105);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("CONSTRUCTION PLANNING", 170, 130);

    let y = 160;
    doc.setFontSize(12);
    doc.text("Project Information", 40, y);
    y += 20;

    doc.setFontSize(11);
    doc.text(`Project Type: ${projectType}`, 40, y); y += 20;
    doc.text(`Floors: ${floors}`, 40, y); y += 20;
    doc.text(`Owner Name: ${ownerName}`, 40, y); y += 20;
    doc.text(`Engineer / Contractor: ${engineerName}`, 40, y);
    y += 30;

    const rows = items.map((i, index) => [
      index + 1,
      i.title,
      i.description,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["#", "Title", "Description"]],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 200, 0], textColor: 0 },
    });

    const safe = projectType.replace(/[^\w\s]/gi, "_") || "planning";
    doc.save(`${safe}_planning.pdf`);
  };

  return (
    <div className="p-3">
      <h3 className="text-warning fw-bold mb-3">🏗 New Construction / Planning</h3>

      {/* PROJECT INFO */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="fw-bold">Project Information</h5>

        <input className="form-control my-2" placeholder="Project Type"
          value={planning.projectType}
          onChange={(e) => setPlanning({ ...planning, projectType: e.target.value })}
        />

        <input className="form-control my-2" placeholder="Floors"
          value={planning.floors}
          onChange={(e) => setPlanning({ ...planning, floors: e.target.value })}
        />

        <input className="form-control my-2" placeholder="Owner Name"
          value={planning.ownerName}
          onChange={(e) => setPlanning({ ...planning, ownerName: e.target.value })}
        />

        <input className="form-control my-2" placeholder="Engineer / Contractor"
          value={planning.engineerName}
          onChange={(e) => setPlanning({ ...planning, engineerName: e.target.value })}
        />

        <button className="btn btn-warning mt-2" onClick={saveProjectInfo}>
          Save Project Info
        </button>
      </div>

      {/* ADD NEW ITEM */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="fw-bold">Add New Planning Item</h5>

        <input className="form-control my-2" placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />

        <textarea className="form-control my-2" rows={3}
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />

        <button className="btn btn-warning" onClick={savePlanningItem}>
          Save Item
        </button>
      </div>

      {/* SAVED PLANNING CARD (Like Payment Schedule UI) */}
      <h5 className="fw-bold mb-2">📘 Saved Construction Planning</h5>

      {planning.items.length > 0 ? (
        <div className="border rounded p-3 mb-3 bg-light shadow-sm">
          <h6 className="fw-bold mb-1">{planning.projectType}</h6>
          <p className="mb-1">Owner: {planning.ownerName}</p>
          <p className="mb-1">Floors: {planning.floors}</p>

          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-sm btn-success" onClick={generatePDF}>
              📄 Download PDF
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                if (window.confirm("Delete entire planning?")) {
                  axios.delete(`${API_URL}/api/planning`).then(() => {
                    setPlanning({
                      projectType: "",
                      floors: "",
                      ownerName: "",
                      engineerName: "",
                      items: [],
                    });
                  });
                }
              }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="text-muted">No planning saved yet.</p>
      )}

      {/* INDIVIDUAL ITEMS LIST */}
      {planning.items.map((item, index) => (
        <div key={index} className="card p-3 mb-2 shadow-sm">
          <h6 className="fw-bold">{item.title}</h6>
          <p>{item.description}</p>
          <button className="btn btn-danger btn-sm" onClick={() => deleteItem(index)}>
            Delete Item
          </button>
        </div>
      ))}
    </div>
  );
}
