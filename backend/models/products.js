import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  id: Number,
  created_at: Date,
  position: Number,
  updated_at: Date,
  product_id: Number,
  variant_ids: [Number],
  src: String,
  width: Number,
  height: Number,
});

const VariantSchema = new mongoose.Schema({
  id: Number,
  title: String,
  option1: String,
  option2: String,
  option3: String,
  sku: String,
  requires_shipping: Boolean,
  taxable: Boolean,
  featured_image: String,
  available: Boolean,
  price: Number,
  grams: Number,
  compare_at_price: Number,
  position: Number,
  product_id: Number,
  created_at: Date,
  updated_at: Date,
});

const OptionSchema = new mongoose.Schema({
  name: String,
  position: Number,
  values: [String],
});

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: String,
  handle: String,
  body_html: String,
  published_at: Date,
  created_at: Date,
  updated_at: Date,
  vendor: String,
  product_type: String,
  tags: [String],

  variants: [VariantSchema],
  images: [ImageSchema],
  options: [OptionSchema],
});

export default mongoose.model("Product", ProductSchema);