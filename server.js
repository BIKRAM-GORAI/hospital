import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Load env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// For static frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));


//!                  MAIN CONTENT HERE




//*  now we will import the routes


import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth",authRoutes);



// Connect to DB then start server
connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
