import express from "express";
import { getPayments, addPayment, deletePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getPayments);
router.post("/", addPayment);
router.delete("/:id", deletePayment);

export default router;
