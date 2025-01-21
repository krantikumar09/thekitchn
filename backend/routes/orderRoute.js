import express from "express";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.post("/verify", verifyOrder);

export default orderRoute;
