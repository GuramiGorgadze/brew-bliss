import Products from "../models/products.js";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ err: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ err: "Rating must be between 1 and 5" });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ err: "Comment is required" });
    }

    const user = await Users.findById(decoded.id).select("firstName lastName");
    if (!user) return res.status(404).json({ err: "User not found" });

    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ err: "Product not found" });

    const review = {
      reviewer: `${user.firstName} ${user.lastName}`,
      rating,
      comment: comment.trim(),
    };

    product.reviews.push(review);

    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / product.reviews.length;

    await product.save();

    const savedReview = product.reviews[product.reviews.length - 1];
    return res.status(200).json({ data: savedReview });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};
