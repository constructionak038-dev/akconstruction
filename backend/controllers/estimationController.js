import Estimation from "../models/Estimation.js";

// Get all estimations
export const getEstimations = async (req, res) => {
  try {
    const estimations = await Estimation.find().sort({ createdAt: -1 });
    res.json(estimations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching estimations", error: err.message });
  }
};

// Add new estimation
export const addEstimation = async (req, res) => {
  try {
    const newEstimation = new Estimation(req.body);
    await newEstimation.save();
    res.json({ message: "Estimation added successfully", estimation: newEstimation });
  } catch (err) {
    res.status(500).json({ message: "Error adding estimation", error: err.message });
  }
};

// Delete estimation
export const deleteEstimation = async (req, res) => {
  try {
    await Estimation.findByIdAndDelete(req.params.id);
    res.json({ message: "Estimation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting estimation", error: err.message });
  }
};
