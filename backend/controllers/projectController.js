import Project from "../models/Project.js";

// 🧱 Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// 🏗️ Add new project with multiple images
export const addProject = async (req, res) => {
  try {
    console.log("🟢 Headers:", req.headers.authorization);
    console.log("🟢 Files uploaded:", req.files?.length || 0);

    // 🔐 Auth check
    if (req.headers.authorization !== process.env.ADMIN_SECRET)
      return res.status(401).json({ message: "Unauthorized" });

    // ✅ Gather all image URLs from Cloudinary
    const imageUrls = req.files?.map((file) => file.path) || [];

    // 🆕 Create and save new project
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      images: imageUrls,
    });

    await newProject.save();
    console.log("✅ Project saved:", newProject.title);

    res.json({ message: "✅ Project added successfully", project: newProject });
  } catch (error) {
    console.error("❌ Add Project Error:", error);
    res.status(500).json({ message: "Error adding project", error: error.message });
  }
};

// ✏️ Update existing project with optional new images
export const updateProject = async (req, res) => {
  try {
    console.log("🟡 Updating project:", req.params.id);

    if (req.headers.authorization !== process.env.ADMIN_SECRET)
      return res.status(401).json({ message: "Unauthorized" });

    // ✅ Handle both old and new images
    let imageUrls = [];

    // New uploaded images
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => file.path);
    } else if (req.body.images) {
      // Existing images passed from frontend
      imageUrls = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        images: imageUrls,
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Project not found for update" });

    console.log("✅ Project updated:", updated.title);
    res.json(updated);
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};

// 🗑️ Delete a project
export const deleteProject = async (req, res) => {
  try {
    if (req.headers.authorization !== process.env.ADMIN_SECRET)
      return res.status(401).json({ message: "Unauthorized" });

    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Project not found for deletion" });

    console.log("🗑️ Project deleted:", deleted.title);
    res.json({ message: "✅ Project deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};
