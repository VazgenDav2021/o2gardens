import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
