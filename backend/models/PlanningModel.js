import mongoose from "mongoose";

const planningItemSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const planningSchema = new mongoose.Schema(
  {
    projectType: String,      // Residential Building Project
    floors: String,           // G+1
    ownerName: String,        // MD Husain
    engineerName: String,     // Arfat Kazi

    items: [planningItemSchema], // RCC Work, Kitchen, etc…
  },
  { timestamps: true }
);

const Planning = mongoose.model("Planning", planningSchema);
export default Planning;
