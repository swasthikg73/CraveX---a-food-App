import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import "dotenv/config";
import cartRoute from "./routes/cartRoute.js";
import authMiddleware from "./middleware/auth.js";
import orderRoute from "./routes/orderRoute.js";

authMiddleware;
//ap config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//db conection
connectDB();

// api endpoints
app.use("/images", express.static("uploads"));

app.use("/api/food", foodRouter);
app.use("/api/user", userRoute);
app.use("/api/cart", authMiddleware, cartRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("App launched");
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});

//mongodb+srv://CraveX:Swasthik13271@cluster0.ekq3xkw.mongodb.net/?
// mongodb+srv://CraveX:Swasthik13271@cluster0.ekq3xkw.mongodb.net/?appName=Cluster0
