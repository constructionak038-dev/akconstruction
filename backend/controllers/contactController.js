import Contact from "../models/Contact.js";

// 📨 Save contact message
export const saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMsg = new Contact({ name, email, message });
    await newMsg.save();

    res.json({ message: "✅ Message saved successfully" });
  } catch (error) {
    console.error("❌ Contact Save Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 📋 List messages (for admin)
export const listContacts = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

// 🗑 Delete message (for admin)
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
};
