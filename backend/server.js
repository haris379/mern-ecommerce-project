import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// app.get("/", (req, res) => {
//   res.send("api is running");
// });

connectDB();

app.listen(5001, () => {
  console.log("Server is running on Port 5001");
});
