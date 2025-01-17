import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connetion
connectDB();

// api endpoints
app.use('/api/food', foodRoute);
app.use('/images', express.static('uploads'));
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("API working....");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
