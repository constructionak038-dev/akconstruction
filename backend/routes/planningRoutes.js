import express from "express";
import {
  getPlanning,
  addPlanning,
  deletePlanning,
} from "../controllers/planningController.js";

const router = express.Router();

// 🧾 Get all planning entries
router.get("/", getPlanning);

// ➕ Add planning
router.post("/", addPlanning);

// 🗑️ Delete planning
router.delete("/:id", deletePlanning);

export default router;
