import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import leaveRoutes from "./routes/leave.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

console.log("MONGO_URI:", process.env.MONGO_URI);
// Connect to MongoDB
connectDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/leave", leaveRoutes);
app.use(express.static(path.join(process.cwd(), "views")));

app.get("/", (req, res) => res.sendFile(path.join(process.cwd(), "views", "login.html")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`ERP Employee running at http://localhost:${PORT}`));