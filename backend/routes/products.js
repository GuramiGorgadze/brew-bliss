import express from "express";
import { getProducts } from "../controllers/products.js";
const ProductsRouter = express.Router()

ProductsRouter.get('/', getProducts)


export default ProductsRouter