import { login, register } from "../controllers/userController.js";
import express from "express";

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/register", register);

export default userRoute;
