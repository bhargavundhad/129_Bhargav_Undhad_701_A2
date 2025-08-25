import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Employee from "./models/Employee.js";
import dotenv from "dotenv";
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const passwordHash = await bcrypt.hash("bhargav123", 10);
  await Employee.create({
    empid: "B1312",
    name: "Bhargav Undhad",
    email: "bhargavundhad@gmail.com",
    passwordHash,
    salary: 80000,
    department: "Software Engineer"
  });
  console.log("Employee seeded!");
  mongoose.disconnect();
}

seed();