import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import summaryRoutes from "./routes/summaryRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));


app.get("/api/health", (_, res) => res.json({ ok: true }));


app.use("/api", summaryRoutes);

export default app;
