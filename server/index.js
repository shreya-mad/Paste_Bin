import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import healthRoute from "./routes/health.js";
import pasteRoutes from "./routes/pastes.js";

dotenv.config();
connectDB();

const app = express();
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api/healthz", healthRoute);
app.use("/api/pastes", pasteRoutes);

const PORT =process.env.PORT || 5000;
// console.log("🚀 Server starting on port "+PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
