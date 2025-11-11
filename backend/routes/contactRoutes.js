import express from "express";
import { sendMessage } from "../controllers/contactController.js";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", sendMessage);

router.get("/list", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting message" });
  }
});

export default router;
