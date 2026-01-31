import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  const ok = mongoose.connection.readyState === 1;
  res.status(200).json({ ok });
});

export default router;
