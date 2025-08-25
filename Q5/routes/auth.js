import express from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { empid, password } = req.body;
  const employee = await Employee.findOne({ empid });
  if (!employee || !(await employee.verifyPassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ empid: employee.empid }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;