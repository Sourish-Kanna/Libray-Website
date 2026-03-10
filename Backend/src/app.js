import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { backendLogger } from "./utils/logger.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://siesgstlibrary.vercel.app",
      // "https://libray-website-client.vercel.app",
      // "https://libray-website.vercel.app",
      // "https://libray-website-71gt.vercel.app",
      // "https://libray-website-tan.vercel.app",
      // "https://library-sies-gst.vercel.app",
      // "https://library-siesgst.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
  const requestId = crypto.randomUUID();
  const start = Date.now();

  req.requestId = requestId;

  backendLogger.info({
    module: "app",
    action: "REQUEST_LIFECYCLE",
    step: "START",
    status: "STARTED",
    requestId,
    message: `[REQUEST_LIFECYCLE] START STARTED`,
    meta: {
      method: req.method,
      path: req.originalUrl,
    },
  });

  res.on("finish", () => {
    backendLogger.info({
      module: "app",
      action: "REQUEST_LIFECYCLE",
      step: "END",
      status: "SUCCESS",
      requestId,
      message: `[REQUEST_LIFECYCLE] END SUCCESS`,
      durationMs: Date.now() - start,
      statusCode: res.statusCode,
      meta: {
        method: req.method,
        path: req.originalUrl,
      },
    });
  });

  next();
});

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
  backendLogger.info({
    module: "app",
    action: "REQUEST_LIFECYCLE",
    step: "SEND_RESPONSE",
    status: "SUCCESS",
    requestId: req.requestId,
    message: `[REQUEST_LIFECYCLE] SEND_RESPONSE SUCCESS`,
    statusCode: 200,
  });
  res.status(200).json({ message: "Library Management System Backend is running..." });
});

export { app };
