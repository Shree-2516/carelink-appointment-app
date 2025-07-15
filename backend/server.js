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

// ✅ CORS Configuration (includes admin localhost:5175 and deployed links)
const allowedOrigins = [
  "http://localhost:3000",                   // React dev (default)
  "http://localhost:5173",                   // Vite frontend dev
  "http://localhost:5174",                   // Optional: second Vite instance
  "http://localhost:5175",                   // Vite admin dev
  "https://carelink-frontend.vercel.app",    // deployed frontend (Vercel)
  "https://carelink-appointment-app.vercel.app", // alternate frontend
  "https://carelink-admin.netlify.app",      // deployed admin (Netlify)
  "https://carelink-appointment-app-xyb8.vercel.app" // deployed admin alt
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl/postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
