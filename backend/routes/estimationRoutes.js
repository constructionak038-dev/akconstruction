import express from "express";
import {
  getEstimations,
  addEstimation,
  deleteEstimation,
} from "../controllers/estimationController.js";

const router = express.Router();

// 🧾 Get all estimations
router.get("/", getEstimations);

// ➕ Add estimation
router.post("/", addEstimation);

// 🗑️ Delete estimation
router.delete("/:id", deleteEstimation);

export default router;
