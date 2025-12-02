import express from "express";
import {
  placeOrder,
  userOrders,
  verifyOrder,
  listOrders,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.post("/verify", authMiddleware, verifyOrder);
orderRoute.get("/userOrders", authMiddleware, userOrders);
orderRoute.get("/list", listOrders);
export default orderRoute;
