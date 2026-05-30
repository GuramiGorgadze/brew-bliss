import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compare_at_price: {
      type: Number,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    published_at: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    variants: [variantSchema],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", ProductSchema);
