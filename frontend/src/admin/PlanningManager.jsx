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
      if (res.data) {
        setPlanning(res.data);
      }
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

  // Save Planning Item
  const savePlanningItem = async () => {
    if (!newItem.title || !newItem.description)
      return alert("Please fill all fields");

    try {
      const res = await axios.post(`${API_URL}/api/planning/item`, newItem);
      setPlanning(res.data);
      setNewItem({ title: "", description: "" });
    } catch (err) {
      alert("Failed to save item");
    }
  };

  // Delete Item
  const deleteItem = async (index) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      await axios.delete(`${API_URL}/api/planning/item/${index}`);
      fetchPlanning();
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  // ⭐ Generate PDF
  const generatePDF = () => {
    const { projectType, floors, ownerName, engineerName, items } = planning;

    const doc = new jsPDF("p", "pt", "a4");

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AK CONSTRUCTION", 40, 40);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("At Post Panderi, Tal: Mandangad, Dist: Ratnagiri", 40, 60);
    doc.text("Mob: 7276102921", 40, 75);
    doc.text("Email: arafatkazi094@gmail.com", 40, 90);

    doc.setDrawColor(255, 200, 0);
    doc.setLineWidth(1.5);
    doc.line(40, 105, 550, 105);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("CONSTRUCTION PLANNING", 170, 130);

    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 130);

    let y = 160;

    // Project Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Project Information", 40, y);
    y += 20;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Project Type: ${projectType || "-"}`, 40, y); y += 20;
    doc.text(`Floors: ${floors || "-"}`, 40, y); y += 20;
    doc.text(`Owner Name: ${ownerName || "-"}`, 40, y); y += 20;
    doc.text(`Engineer / Contractor: ${engineerName || "-"}`, 40, y);
    y += 30;

    // Table Data
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
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 150 },
        2: { cellWidth: 320 },
      },
    });

    const safeName =
      projectType?.replace(/[^\w\s]/gi, "_") || "construction_planning";

    doc.save(`${safeName}_planning.pdf`);
  };

  return (
    <div className="p-3">
      <h3 className="text-warning fw-bold mb-3">🏗 New Construction / Planning</h3>

      {/* PDF Button */}
      <button className="btn btn-success mb-3" onClick={generatePDF}>
        📄 Download Planning PDF
      </button>

      {/* Project Info Section */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="fw-bold">Project Information</h5>

        <input
          className="form-control my-2"
          placeholder="Project Type"
          value={planning.projectType}
          onChange={(e) => setPlanning({ ...planning, projectType: e.target.value })}
        />

        <input
          className="form-control my-2"
          placeholder="Floors (e.g. G+1)"
          value={planning.floors}
          onChange={(e) => setPlanning({ ...planning, floors: e.target.value })}
        />

        <input
          className="form-control my-2"
          placeholder="Owner Name"
          value={planning.ownerName}
          onChange={(e) => setPlanning({ ...planning, ownerName: e.target.value })}
        />

        <input
          className="form-control my-2"
          placeholder="Engineer / Contractor"
          value={planning.engineerName}
          onChange={(e) =>
            setPlanning({ ...planning, engineerName: e.target.value })
          }
        />

        <button className="btn btn-warning mt-2" onClick={saveProjectInfo}>
          Save Project Info
        </button>
      </div>

      {/* Add Item */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="fw-bold">Add New Planning Item</h5>

        <input
          className="form-control my-2"
          placeholder="Title (e.g. RCC Work)"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />

        <textarea
          className="form-control my-2"
          placeholder="Description"
          rows={4}
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />

        <button className="btn btn-warning" onClick={savePlanningItem}>
          Save Item
        </button>
      </div>

      {/* Items List */}
      <h5 className="fw-bold">📌 Saved Construction Planning</h5>
      {planning.items?.map((item, index) => (
        <div key={index} className="card p-3 mb-2 shadow-sm bg-light">
          <h6 className="fw-bold">{item.title}</h6>
          <p>{item.description}</p>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteItem(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
