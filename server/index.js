import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import summaryRoutes from "./routes/summaryRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// API routes
app.use("/api", summaryRoutes);

// ✅ Lazy DB connection (per request if needed)
let isConnected = false;
async function initDB() {
  if (!isConnected) {
    await connectDB(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  }
}

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  try {
    await initDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// ✅ Export Express app for Vercel
export default app;
