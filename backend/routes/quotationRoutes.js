import express from "express";
import Quotation from "../models/Quotation.js";

const router = express.Router();

// 🧾 Get all quotations
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    console.error("❌ Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations" });
  }
});

// ➕ Add a new quotation
router.post("/", async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.json({ message: "✅ Quotation added successfully", quotation });
  } catch (error) {
    console.error("❌ Error adding quotation:", error);
    res.status(500).json({ message: "Error adding quotation", error });
  }
});

// 🗑️ Delete a quotation
router.delete("/:id", async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Quotation deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting quotation:", error);
    res.status(500).json({ message: "Error deleting quotation" });
  }
});

export default router;
