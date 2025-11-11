import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: String,
  rate: String,
  qty: String,
  unit: String,
  amount: String,
  note: String,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  note: String,
  items: [itemSchema],
});

const estimationSchema = new mongoose.Schema(
  {
    projectTitle: String,
    ownerName: String,
    sections: [sectionSchema],
    totalEstimate: String,
  },
  { timestamps: true }
);

const Estimation = mongoose.model("Estimation", estimationSchema);
export default Estimation;
