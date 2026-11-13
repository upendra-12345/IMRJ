import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
dotenv.config();

const app = express();

// Connect MongoDB
await connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).send("IMRJ Backend API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    if (err.name === "MulterError") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(400).json({
        success: false,
        message: err.message || "Something went wrong"
    });
});

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});