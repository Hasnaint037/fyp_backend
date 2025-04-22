const Product = require("../schema/product.schema");
const cloudinary = require("cloudinary").v2;

exports.createProduct = async (req, res) => {
  const { name, price, description, quantity } = req.body;
  const { file } = req; // Get file from the request

  // Validate inputs
  if (!name || !price || !description || !quantity) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  // If image isn't uploaded
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });
  }

  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      image: file.path, // Save Cloudinary URL
      quantity,
    });
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.deleteById(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product found", success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity } = req.body;
  const { file } = req;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // If new image is uploaded, delete the old one from Cloudinary
    if (file) {
      const oldImageUrl = product.image;

      // Extract public_id from Cloudinary URL
      const publicId = oldImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);

      // Replace with new image
      product.image = file.path;
    }

    // Update other fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (quantity) product.quantity = quantity;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
