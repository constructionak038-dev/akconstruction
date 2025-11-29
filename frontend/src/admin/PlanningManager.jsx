import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://akconstruction-backend.onrender.com";

export default function PlanningManager() {
  const [planningList, setPlanningList] = useState([]);
  const [newPlanning, setNewPlanning] = useState({
    projectType: "",
    floors: "",
    ownerName: "",
    engineerName: "",
    sections: [],
  });

  const [section, setSection] = useState({
    title: "",
    note: "",
    items: [],
  });

  const [item, setItem] = useState({
    description: "",
  });

  // ▶ Load all planning entries
  useEffect(() => {
    fetchPlanning();
  }, []);

  const fetchPlanning = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/planning`);
      setPlanningList(res.data);
    } catch (err) {
      alert("Failed to fetch planning");
    }
  };

  // ▶ Add item inside section
  const addItem = () => {
    if (!item.description) return alert("⚠️ Enter item description");

    setSection({
      ...section,
      items: [...section.items, item],
    });

    setItem({ description: "" });
  };

  // ▶ Add section inside planning
  const addSection = () => {
    if (!section.title) return alert("⚠️ Enter section title");

    setNewPlanning({
      ...newPlanning,
      sections: [...newPlanning.sections, section],
    });

    setSection({ title: "", note: "", items: [] });
  };

  // ▶ Save full planning entry
  const savePlanning = async () => {
    if (!newPlanning.projectType || !newPlanning.ownerName)
      return alert("⚠️ Project type & owner required");

    try {
      await axios.post(`${API_URL}/api/planning`, newPlanning);

      alert("✅ Planning saved successfully!");

      setNewPlanning({
        projectType: "",
        floors: "",
        ownerName: "",
        engineerName: "",
        sections: [],
      });

      fetchPlanning();
    } catch (err) {
      alert("❌ Failed to save planning");
    }
  };

  // ▶ Delete planning entry
  const deletePlanning = async (id) => {
    if (!window.confirm("Delete this planning entry?")) return;

    try {
      await axios.delete(`${API_URL}/api/planning/${id}`);
      fetchPlanning();
    } catch {
      alert("Failed to delete");
    }
  };

  // ▶ PDF Generator
  const generatePDF = (plan) => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AK CONSTRUCTION", 40, 40);

    doc.setFontSize(11);
    doc.text("At Post Panderi, Tal: Mandangad, Dist: Ratnagiri", 40, 60);
    doc.text("Mob: 7276102921", 40, 75);
    doc.text("Email: arafatkazi094@gmail.com", 40, 90);

    doc.setDrawColor(255, 200, 0);
    doc.line(40, 100, 550, 100);

    doc.setFontSize(14);
    doc.text("CONSTRUCTION PLANNING", 200, 120);

    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 120);

    let y = 150;

    doc.text(`Project Type: ${plan.projectType}`, 40, y); y += 20;
    doc.text(`Floors: ${plan.floors}`, 40, y); y += 20;
    doc.text(`Owner: ${plan.ownerName}`, 40, y); y += 20;
    doc.text(`Engineer/Contractor: ${plan.engineerName}`, 40, y);
    y += 30;

    plan.sections.forEach((sec, sIdx) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${sIdx + 1}] ${sec.title}`, 40, y);
      y += 10;

      const rows = sec.items.map((i, index) => [
        index + 1,
        i.description,
      ]);

      autoTable(doc, {
        startY: y + 10,
        head: [["#", "Description"]],
        body: rows,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [255, 200, 0], textColor: 0 },
      });

      y = doc.lastAutoTable.finalY + 20;
      if (sec.note) {
        doc.setFont("helvetica", "italic");
        doc.text(`Note: ${sec.note}`, 40, y);
        y += 20;
      }
    });

    doc.save(`${plan.projectType.replace(/\s+/g, "_")}_planning.pdf`);
  };

  return (
    <div>
      <h3 className="text-warning mb-3">🏗 Planning Management</h3>

      {/* ➕ Planning Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Project Type"
          value={newPlanning.projectType}
          onChange={(e) =>
            setNewPlanning({ ...newPlanning, projectType: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Floors (e.g., G+1)"
          value={newPlanning.floors}
          onChange={(e) =>
            setNewPlanning({ ...newPlanning, floors: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Owner Name"
          value={newPlanning.ownerName}
          onChange={(e) =>
            setNewPlanning({ ...newPlanning, ownerName: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Engineer / Contractor"
          value={newPlanning.engineerName}
          onChange={(e) =>
            setNewPlanning({ ...newPlanning, engineerName: e.target.value })
          }
        />

        <hr />

        {/* ➕ Add Section */}
        <h6 className="fw-bold">Add Section</h6>
        <input
          className="form-control mb-2"
          placeholder="Section Title"
          value={section.title}
          onChange={(e) => setSection({ ...section, title: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Section Note"
          value={section.note}
          onChange={(e) => setSection({ ...section, note: e.target.value })}
        />

        {/* ➕ Add Item */}
        <h6 className="fw-bold mt-3">Add Item</h6>
        <div className="row g-2">
          <div className="col-md-10">
            <input
              className="form-control"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-sm btn-success w-100" onClick={addItem}>
              ➕ Add Item
            </button>
          </div>
        </div>

        {/* Items Table */}
        {section.items.length > 0 && (
          <table className="table table-sm mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((it, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{it.description}</td>
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

        {/* Show saved sections */}
        {newPlanning.sections.length > 0 && (
          <div className="mt-3">
            <h6>📋 Sections Added:</h6>
            {newPlanning.sections.map((s, i) => (
              <p key={i}>{i + 1}. {s.title} ({s.items.length} items)</p>
            ))}
          </div>
        )}

        <div className="text-end mt-3">
          <button className="btn btn-warning" onClick={savePlanning}>
            Save Planning
          </button>
        </div>
      </div>

      {/* Saved Planning List */}
      <h5 className="mb-2">📑 Saved Planning</h5>
      {planningList.map((plan) => (
        <div
          key={plan._id}
          className="border rounded p-3 mb-3 bg-light shadow-sm"
        >
          <h6 className="fw-bold mb-1">{plan.projectType}</h6>
          <p className="mb-1">Owner: {plan.ownerName}</p>
          <p className="mb-1">Floors: {plan.floors}</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => generatePDF(plan)}
            >
              📄 Download PDF
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deletePlanning(plan._id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
