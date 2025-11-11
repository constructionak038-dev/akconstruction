import express from "express";
import upload from "../middleware/upload.js";
import {
  getProjects,
  addProject,
  deleteProject,
} from "../controllers/projectController.js";
import Project from "../models/Project.js";

const router = express.Router();

// 🧱 Get all projects
router.get("/", getProjects);

// 🧱 Get single project (must come before others using :id)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    res.status(500).json({ message: "Error fetching project details" });
  }
});

// 🏗️ Add new project
router.post("/", upload.array("images", 10), addProject);

// ✏️ Update existing project (keep old + add new)
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Append new images if uploaded
    let updatedImages = project.images;
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      updatedImages = [...project.images, ...newImages];
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.category = req.body.category || project.category;
    project.images = updatedImages;

    await project.save();
    res.json({ message: "✅ Project updated successfully", project });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
});

// ➕ Add images to an existing project
router.post("/:id/add-images", upload.array("images", 10), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const newImages = req.files.map((file) => file.path);
    project.images = [...project.images, ...newImages];
    await project.save();

    res.json({ message: "✅ Images added successfully", project });
  } catch (error) {
    console.error("❌ Add Images Error:", error);
    res.status(500).json({ message: "Error adding images", error: error.message });
  }
});

// 🗑️ Delete a single image from a project
router.delete("/:id/images/:index", async (req, res) => {
  try {
    const { id, index } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // If invalid index
    if (index < 0 || index >= project.images.length)
      return res.status(400).json({ message: "Invalid image index" });

    // Remove specific image
    project.images.splice(index, 1);
    await project.save();

    res.json({ message: "✅ Image deleted successfully", project });
  } catch (error) {
    console.error("❌ Delete Image Error:", error);
    res.status(500).json({ message: "Error deleting image", error: error.message });
  }
});

// 🗑️ Delete project
router.delete("/:id", deleteProject);

export default router;
