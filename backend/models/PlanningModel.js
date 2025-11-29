import mongoose from "mongoose";

const planningItemSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const planningSchema = new mongoose.Schema(
  {
    projectType: String,
    floors: String,
    ownerName: String,
    engineerName: String,
    items: [planningItemSchema],
  },
  { timestamps: true }
);

const Planning = mongoose.model("Planning", planningSchema);
export default Planning;
