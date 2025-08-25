import express from "express";
import Leave from "../models/Leave.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const { empid } = jwt.verify(token, process.env.JWT_SECRET);
    const leave = await Leave.create({ empid, ...req.body });
    res.json(leave);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const { empid } = jwt.verify(token, process.env.JWT_SECRET);
    const leaves = await Leave.find({ empid });
    res.json(leaves);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;