import Product from "../schema/product.schema.js";
import Order from "../schema/order.schema.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    // Calculate total amount
    const totalAmount = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // Validate and update product stock
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.name}` });
      }

      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    // Save order
    const order = new Order({
      items,
      userId: req.user?._id || null,
      totalAmount,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

export const getOrderCountsByCategory = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find({}).populate("items.productId");

    // Counters for categories
    let menCount = 0;
    let womenCount = 0;
    let childrenCount = 0;

    // Count how many orders (or items) belong to each category
    orders.forEach((order) => {
      const categoriesInOrder = new Set();

      order.items.forEach((item) => {
        const category = item.productId?.category;
        if (category) {
          categoriesInOrder.add(category); // to count only once per order
        }
      });

      // Increase count per order if it includes items from that category
      if (categoriesInOrder.has("men")) menCount++;
      if (categoriesInOrder.has("women")) womenCount++;
      if (categoriesInOrder.has("children")) childrenCount++;
    });

    res.status(200).json({
      succcess: true,
      message: "order count fetched successfully",
      data: [menCount, womenCount, childrenCount],
    });
  } catch (error) {
    console.error("Failed to get order category counts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
