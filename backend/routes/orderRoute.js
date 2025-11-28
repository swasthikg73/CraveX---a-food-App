import express from "express";
import {
  placeOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", placeOrder);
orderRoute.post("/verify", verifyOrder);
orderRoute.get("/userOrders", userOrders);
export default orderRoute;
