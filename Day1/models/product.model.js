import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  imgUrl: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to user model
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
