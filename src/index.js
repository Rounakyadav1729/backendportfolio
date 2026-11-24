import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import { configureCloudinary } from "./config/cloudinary.js";
import api from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { uploadsDir } from "./middleware/upload.js";

const app = express();

configureCloudinary();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

app.use(
  "/api/auth/login",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { message: "Too many login attempts" } })
);
app.use(
  "/api/messages",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 40, message: { message: "Too many requests" } })
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", api);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

