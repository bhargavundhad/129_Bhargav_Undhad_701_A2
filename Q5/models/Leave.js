import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  empid: String,
  date: Date,
  reason: String,
  grant: { type: Boolean, default: false },
});

export default mongoose.model("Leave", leaveSchema);