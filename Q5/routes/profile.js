import express from "express";
import Employee from "../models/Employee.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const { empid } = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findOne({ empid });
    res.json(employee);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;