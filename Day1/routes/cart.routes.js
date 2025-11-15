import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import { tokenDecoder } from "../middlewares/tokenMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", tokenDecoder, addToCart);
cartRouter.get("/", tokenDecoder, getCart);
cartRouter.delete("/:productId", tokenDecoder, removeFromCart);

export default cartRouter;
