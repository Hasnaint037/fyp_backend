const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
} = require("../controllers/product.controller");
const upload = require("../services/multer");

router
  .route("/create")
  .post(isAuthenticated, checkAdmin, upload.single("image"), createProduct);

router.route("/getAll").get(isAuthenticated, checkAdmin, getAllProducts);

router.route("/delete/:id").delete(isAuthenticated, checkAdmin, deleteProduct);

router.route("/getSingle/:id").get(isAuthenticated, checkAdmin, getProductById);

router
  .route("/update/:id")
  .put(isAuthenticated, checkAdmin, upload.single("image"), createProduct);

module.exports = router;
