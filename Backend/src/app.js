import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://siesgstlibrary.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import pyqRouter from "./routes/pyqs.route.js";
import syllabusRouter from "./routes/syllabus.route.js";
import newsRouter from "./routes/newsRoute.js";
import branchRoutes from "./routes/branchRoutes.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import yearRoutes from "./routes/year.routes.js";

app.use("/api/v1/syllabus", syllabusRouter);
app.use("/api/v1/pyqs", pyqRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/semester", semesterRoutes);
app.use("/api/v1/year", yearRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Library Management System Backend is running..." });
});

app.use((err, req, res, next) => {
  // Determine the status code
  const statusCode = err.statusCode || 500;

  // Send a clean, JSON response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show stack trace in development mode, never in production
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export { app };
