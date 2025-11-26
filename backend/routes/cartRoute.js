import express from "express";
import {
  addToCart,
  getCartData,
  removeFromCart,
} from "../controllers/cartController.js";
const cartRoute = express.Router();

cartRoute.post("/add", addToCart);
cartRoute.put("/remove", removeFromCart);
cartRoute.get("/getCartData", getCartData);

export default cartRoute;
