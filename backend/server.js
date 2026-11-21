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
  "https://imrj.vercel.app",
  "https://imrj.org",
  "https://www.imrj.org",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  credentials: true,
};

app.use(cors(corsOptions));

// =================================
// BODY PARSER
// =================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =================================
// DATABASE CONNECTION
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
  res.status(200).send(
    "IMRJ Backend API is running successfully."
  );
});

// =================================
// ERROR HANDLER
// =================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed by CORS",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =================================
// SERVER
// =================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IMRJ Backend running on port ${PORT}`);
});