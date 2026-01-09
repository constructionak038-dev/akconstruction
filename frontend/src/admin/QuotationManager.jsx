import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchQuotationsApi,
  saveQuotationApi,
  deleteQuotationApi,
} from "./services/quotationApi";
import { generatePDF } from "./utils/generateQuotationPDF";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://akconstruction-backend.onrender.com";

export default function QuotationManager() {
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

  const [editIndex, setEditIndex] = useState(null);
  const [editingQuotationId, setEditingQuotationId] = useState(null);

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    const res = await fetchQuotationsApi();
    setQuotations(res.data);
  };

  // ---------------- ADD / UPDATE ITEM ----------------
  const addItem = () => {
    if (!item.description || !item.rate) {
      alert("Fill item details");
      return;
    }

    setNewQuotation((prev) => {
      const items = [...prev.items];
      if (editIndex !== null) items[editIndex] = item;
      else items.push(item);
      return { ...prev, items };
    });

    setItem({
      description: "",
      unit: "",
      area: "",
      rate: "",
      amount: "",
    });
    setEditIndex(null);
  };

  const handleEditItem = (it, index) => {
    setItem(it);
    setEditIndex(index);
  };

  // ---------------- EDIT QUOTATION ----------------
  const handleEditQuotation = (q) => {
    setNewQuotation({
      projectTitle: q.projectTitle,
      ownerName: q.ownerName,
      areaStatement: q.areaStatement,
      totalArea: q.totalArea,
      note: q.note,
      items: q.items || [],
      totalAmount: q.totalAmount,
    });

    setEditingQuotationId(q._id);
    setEditIndex(null);

    setItem({
      description: "",
      unit: "",
      area: "",
      rate: "",
      amount: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- CLONE QUOTATION ----------------
  const handleCloneQuotation = (q) => {
    setNewQuotation({
      projectTitle: q.projectTitle + " (Copy)",
      ownerName: q.ownerName,
      areaStatement: q.areaStatement,
      totalArea: q.totalArea,
      note: q.note,
      items: q.items || [],
      totalAmount: q.totalAmount,
    });

    setEditingQuotationId(null); // 🔑 important
    setEditIndex(null);

    setItem({
      description: "",
      unit: "",
      area: "",
      rate: "",
      amount: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- SAVE / UPDATE ----------------
  const saveQuotation = async () => {
    if (editingQuotationId) {
      await axios.put(
        `${API_URL}/api/quotations/${editingQuotationId}`,
        newQuotation
      );
      alert("Quotation updated");
    } else {
      await saveQuotationApi(newQuotation);
      alert("Quotation saved");
    }

    loadQuotations();

    setNewQuotation({
      projectTitle: "",
      ownerName: "",
      areaStatement: "",
      totalArea: "",
      note: "",
      items: [],
      totalAmount: "",
    });

    setEditingQuotationId(null);
  };

  const deleteQuotation = async (id) => {
    if (!window.confirm("Delete quotation?")) return;
    await deleteQuotationApi(id);
    loadQuotations();
  };

  return (
    <div>
      <h3 className="text-warning mb-3">📄 Quotation Management</h3>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row">
          {[
            ["Project Title", "projectTitle"],
            ["Owner Name", "ownerName"],
            ["Area Statement", "areaStatement"],
            ["Total Area", "totalArea"],
          ].map(([ph, key]) => (
            <div className="col-md-6 mb-2" key={key}>
              <input
                className="form-control"
                placeholder={ph}
                value={newQuotation[key]}
                onChange={(e) =>
                  setNewQuotation({
                    ...newQuotation,
                    [key]: e.target.value,
                  })
                }
              />
            </div>
          ))}

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

        {/* ITEM FORM */}
        <h6 className="fw-bold">Add Item</h6>
        <div className="row g-2">
          {["description", "unit", "area", "rate", "amount"].map((f) => (
            <div className="col-md-2" key={f}>
              <input
                className="form-control"
                placeholder={f}
                value={item[f]}
                onChange={(e) => setItem({ ...item, [f]: e.target.value })}
              />
            </div>
          ))}

          <div className="col-md-2">
            <button
              type="button"
              onClick={addItem}
              className="btn btn-success w-100"
            >
              {editIndex !== null ? "Update" : "➕"}
            </button>
          </div>
        </div>

        {/* ITEM TABLE */}
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
                <th>Action</th>
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
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditItem(it, i)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="text-end mt-3">
          <input
            className="form-control w-25 d-inline"
            placeholder="Total Amount"
            value={newQuotation.totalAmount}
            onChange={(e) =>
              setNewQuotation({
                ...newQuotation,
                totalAmount: e.target.value,
              })
            }
          />
          <button
            type="button"
            onClick={saveQuotation}
            className="btn btn-warning ms-2"
          >
            {editingQuotationId ? "Update Quotation" : "Save Quotation"}
          </button>
        </div>
      </div>

      {/* SAVED QUOTATIONS */}
      <h5>📜 Saved Quotations</h5>

      {quotations.map((q) => (
        <div key={q._id} className="border p-3 mb-2 bg-light">
          <h6>{q.projectTitle}</h6>
          <p>Owner: {q.ownerName}</p>
          <p>Total: {q.totalAmount}</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => generatePDF(q)}
              className="btn btn-sm btn-success"
            >
              PDF
            </button>

            <button
              type="button"
              onClick={() => handleEditQuotation(q)}
              className="btn btn-sm btn-primary"
            >
              ✏️ Edit
            </button>

            <button
              type="button"
              onClick={() => handleCloneQuotation(q)}
              className="btn btn-sm btn-secondary"
            >
              📋 Clone
            </button>

            <button
              type="button"
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
