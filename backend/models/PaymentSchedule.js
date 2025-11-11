import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: String,
  amount: String,
});

const paymentSchema = new mongoose.Schema(
  {
    projectTitle: String,
    ownerName: String,
    items: [itemSchema],
    totalAmount: String,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
