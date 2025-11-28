import express from "express";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", placeOrder);

orderRoute.post("/verify", verifyOrder);
export default orderRoute;
