import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import summaryRoutes from "./routes/summaryRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// ✅ CORS (allow Vite in dev, all in prod)
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); // Preflight

app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// API routes
app.use("/api", summaryRoutes);

// Connect DB once at cold start
let isConnected = false;
async function initDB() {
  if (!isConnected) {
    await connectDB(process.env.MONGODB_URI);
    isConnected = true;
  }
}
await initDB();

// ✅ Export app (Vercel expects this)
export default app;
