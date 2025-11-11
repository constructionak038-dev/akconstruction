import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  images: [String], // ✅ Supports multiple images
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
 