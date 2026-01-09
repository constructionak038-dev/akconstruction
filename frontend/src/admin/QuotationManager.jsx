import React, { useState, useEffect } from "react";
import {
  fetchQuotationsApi,
  saveQuotationApi,
  deleteQuotationApi,
} from "./services/quotationApi";
import { generatePDF } from "./utils/generateQuotationPDF";
import axios from "axios";

// ✅ SAME AS BEFORE
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
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    const res = await fetchQuotationsApi();
    setQuotations(res.data);
  };

  // ➕ / ✏️ ADD or UPDATE ITEM (UNCHANGED)
  const addItem = () => {
    if (!item.description || !item.rate) {
      alert("⚠️ Please fill item details!");
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

  const handleEditItem = (itemData, index) => {
    setItem(itemData);
    setEditIndex(index);
  };

  // ✏️ LOAD SAVED QUOTATION INTO FORM (UNCHANGED)
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

    // ✅ IMPORTANT: MongoDB _id
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

  // 💾 SAVE / UPDATE QUOTATION (UNCHANGED LOGIC)
  const saveQuotation = async () => {
    if (editingQuotationId) {
      await axios.put(
        `${API_URL}/api/quotations/${editingQuotationId}`,
        newQuotation
      );
      alert("✅ Quotation updated successfully!");
    } else {
      await saveQuotationApi(newQuotation);
      alert("✅ Quotation added successfully!");
    }

    fetchQuotations();

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
    if (!window.confirm("🗑️ Delete this quotation?")) return;
    await deleteQuotationApi(id);
    fetchQuotations();
  };

  return (
    <div>
      <h3 className="text-warning mb-3">📄 Quotation Management</h3>

      {/* ADD QUOTATION FORM — SAME AS BEFORE */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Project Title"
              value={newQuotation.projectTitle}
              onChange={(e) =>
                setNewQuotation({
                  ...newQuotation,
                  projectTitle: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Owner Name"
              value={newQuotation.ownerName}
              onChange={(e) =>
                setNewQuotation({
                  ...newQuotation,
                  ownerName: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Area Statement"
              value={newQuotation.areaStatement}
              onChange={(e) =>
                setNewQuotation({
                  ...newQuotation,
                  areaStatement: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-6 mb-2">
            <input
              className="form-control"
              placeholder="Total Area"
              value={newQuotation.totalArea}
              onChange={(e) =>
                setNewQuotation({
                  ...newQuotation,
                  totalArea: e.target.value,
                })
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
                setNewQuotation({
                  ...newQuotation,
                  note: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* ADD / EDIT ITEM */}
        <h6 className="mt-3 fw-bold">
          {editIndex !== null ? "Edit Item" : "Add Item"}
        </h6>

        <div className="row g-2">
          <div className="col-md-3">
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
              placeholder="Area"
              value={item.area}
              onChange={(e) => setItem({ ...item, area: e.target.value })}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => setItem({ ...item, rate: e.target.value })}
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

          {/* ✅ FIX 1: type="button" */}
          <div className="col-md-1">
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

        {/* ✅ FIX 2: type="button" */}
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
      <h5 className="mb-2">📜 Saved Quotations</h5>

      {quotations.map((q) => (
        <div
          key={q._id}
          className="border rounded p-3 mb-3 shadow-sm bg-light"
        >
          <h6 className="fw-bold mb-1">{q.projectTitle}</h6>
          <p className="mb-1">Owner: {q.ownerName}</p>
          <p className="mb-1">Total: Rs. {q.totalAmount}</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => generatePDF(q)}
              className="btn btn-sm btn-success"
            >
              📄 Download PDF
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
