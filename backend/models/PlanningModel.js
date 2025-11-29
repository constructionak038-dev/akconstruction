import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: String,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  note: String,
  items: [itemSchema],
});

const planningSchema = new mongoose.Schema(
  {
    projectType: String,
    floors: String,
    ownerName: String,
    engineerName: String,
    sections: [sectionSchema],
  },
  { timestamps: true }
);

const Planning = mongoose.model("Planning", planningSchema);
export default Planning;
