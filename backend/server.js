import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
// import path from 'path';

import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

dotenv.config()
const app = express();
const PORT = ENV_VARS.PORT;

// const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Server is working 🚀" });
});

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '/frontend/dist/')));

//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
//     });
// }

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running... ")
});