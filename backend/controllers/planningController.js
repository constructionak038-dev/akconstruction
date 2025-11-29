import Planning from "../models/Planning.js";

// ▶ Get all planning entries
export const getPlanning = async (req, res) => {
  try {
    const plans = await Planning.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching planning",
      error: err.message,
    });
  }
};

// ▶ Add new planning
export const addPlanning = async (req, res) => {
  try {
    const plan = new Planning(req.body);
    await plan.save();

    res.json({
      message: "Planning added successfully",
      planning: plan,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding planning",
      error: err.message,
    });
  }
};

// ▶ Delete planning
export const deletePlanning = async (req, res) => {
  try {
    await Planning.findByIdAndDelete(req.params.id);

    res.json({ message: "Planning deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting planning",
      error: err.message,
    });
  }
};
