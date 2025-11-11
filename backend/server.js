import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import estimationRoutes from "./routes/estimationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


dotenv.config();
const app = express();


// ✅ Allow all origins safely
app.use(cors({
  origin: [
    "http://localhost:3000", // local
    "https://akconstruction.onrender.com",  // your live frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ CORS
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());

// ✅ Admin login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_SECRET) {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid password" });
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  });

// ✅ Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/estimations", estimationRoutes);
app.use("/api/payments", paymentRoutes);


// ✅ Root route
app.get("/", (req, res) => {
  res.send("AK Construction Backend Running...");
});

// ✅ Global error handler (no more [object Object])
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
});
