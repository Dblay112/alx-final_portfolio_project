//imports for our backend
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import itemRouter from "./routes/itemRouter.js";
import userRouter from "./routes/userRouter.js";
import "dotenv/config";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connectDB();

// Serve static files from the "uploads" directory
app.use("/images", express.static("uploads"));

// API endpoints
app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//https://chatgpt.com/c/8436f47f-bd56-41f1-b207-ec11b17f670a
