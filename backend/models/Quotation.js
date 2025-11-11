import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema({
  projectTitle: String,
  ownerName: String,
  areaStatement: String,
  totalArea: String,
  note: String,
  items: [
    {
      description: String,
      unit: String,
      area: String,
      rate: String,
      amount: String,
    },
  ],
  totalAmount: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Quotation", quotationSchema);
