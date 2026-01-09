import express from "express";
import Quotation from "../models/Quotation.js";

const router = express.Router();

// 🧾 Get all quotations
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotations" });
  }
});

// ➕ Add a new quotation
router.post("/", async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.json({ message: "Quotation added", quotation });
  } catch (error) {
    res.status(500).json({ message: "Error adding quotation" });
  }
});

// 🗑️ Delete a quotation
router.delete("/:id", async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: "Quotation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quotation" });
  }
});

// ✏️ Update quotation (IMPORTANT)
router.put("/:id", async (req, res) => {
  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json({
      message: "Quotation updated",
      quotation: updatedQuotation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating quotation" });
  }
});

export default router;
