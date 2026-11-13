import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// =================================
// CORS CONFIGURATION
// =================================

const allowedOrigins = [
  "http://localhost:5173",
  // Add your deployed frontend URL here when available
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =================================
// BODY PARSER
// =================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =================================
// DATABASE
// =================================

connectDB();

// =================================
// API ROUTES
// =================================

app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// =================================
// DEFAULT ROUTE
// =================================

app.get("/", (req, res) => {
  res.send("IMRJ Backend API is running");
});

// =================================
// SERVER
// =================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});