import express from "express";
import Planning from "../models/PlanningModel.js";

const router = express.Router();

// GET planning document (only one)
router.get("/", async (req, res) => {
  try {
    const data = await Planning.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error loading planning");
  }
});

// SAVE/UPDATE project info
router.post("/info", async (req, res) => {
  try {
    let data = await Planning.findOne();
    if (!data) data = new Planning();

    data.projectType = req.body.projectType;
    data.floors = req.body.floors;
    data.ownerName = req.body.ownerName;
    data.engineerName = req.body.engineerName;

    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error saving project info");
  }
});

// ADD planning item
router.post("/item", async (req, res) => {
  try {
    let data = await Planning.findOne();
    if (!data) data = new Planning();

    data.items.push(req.body); // title + description
    await data.save();

    res.json(data);
  } catch (err) {
    res.status(500).send("Error saving item");
  }
});

// DELETE planning item
router.delete("/item/:index", async (req, res) => {
  try {
    const data = await Planning.findOne();
    data.items.splice(req.params.index, 1);
    await data.save();

    res.send("Deleted");
  } catch (err) {
    res.status(500).send("Error deleting item");
  }
});

export default router;
