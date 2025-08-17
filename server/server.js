
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import app from "./app.js";

// dotenv.config();

// const PORT = process.env.PORT || 8080;

// const start = async () => {
//   await connectDB(process.env.MONGODB_URI);
//   app.listen(PORT, () => console.log(`✅ API listening on ${PORT}`));
// };

// start();
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";

dotenv.config();

const init = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
};

init();

export default app;
