import express from "express";
import { saveContact, listContacts, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

// ✅ Save a new contact message
router.post("/", saveContact);

// ✅ List all contact messages (admin use)
router.get("/list", listContacts);

// ✅ Delete a message (admin use)
router.delete("/:id", deleteContact);

export default router;
