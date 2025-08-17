import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";
import summaryRoutes from "./routes/summaryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// Routes
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

// ⬇️ Export app instead of app.listen()
export default app;
