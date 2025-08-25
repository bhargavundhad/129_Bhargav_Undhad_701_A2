import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema({
  empid: { type: String, unique: true },
  name: String,
  email: String,
  passwordHash: String,
  salary: Number,
  department: String,
});

employeeSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("Employee", employeeSchema);