import express from "express";
import {
  getAllOrdersForAdmin,
  getUserOrders,
  placeOrder,
  verifyOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.post("/verify", verifyOrder);
orderRoute.post("/userorders", authMiddleware, getUserOrders);
orderRoute.get("/list-admin", getAllOrdersForAdmin);

export default orderRoute;
