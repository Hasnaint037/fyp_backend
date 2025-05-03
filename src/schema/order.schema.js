// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  image: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  size: {
    type: String,
    default: null, // optional
  },
  color: {
    type: String,
    default: "black", // optional
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
