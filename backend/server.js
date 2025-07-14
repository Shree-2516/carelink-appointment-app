import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());

// ✅ CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:3000",                // React dev server (default)
    "http://localhost:5173",                // Vite dev server
    "https://carelink-frontend.vercel.app", // your deployed frontend
    "https://carelink-admin.netlify.app"    // your deployed admin
  ],
  credentials: true
}));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on PORT: ${port}`);
});
