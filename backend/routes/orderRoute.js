import express from "express";
import { placeOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", placeOrder);
export default orderRoute;
