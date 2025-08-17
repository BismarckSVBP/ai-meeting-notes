
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";
import summaryRoutes from "./routes/summaryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));


app.get("/api/health", (_, res) => res.json({ ok: true }));


app.use("/api", summaryRoutes);


(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Failed to connect DB:", error);
  }
})();


export default app;
