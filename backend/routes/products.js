import express from "express";
import { getProducts, getProductById, addReview } from "../controllers/products.js";
import { cacheMiddleware } from "../middlewares/cache.js";

const ProductsRouter = express.Router();

ProductsRouter.get("/", cacheMiddleware(60), getProducts);
ProductsRouter.get("/:id", cacheMiddleware(120), getProductById);
ProductsRouter.post("/:id/reviews", addReview);

export default ProductsRouter;
