const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  getCategoryWiseProducts,
  getForMen,
  getForWomen,
  getForChildren,
} = require("../controllers/product.controller");
const upload = require("../services/multer");

router
  .route("/create")
  .post(isAuthenticated, checkAdmin, upload.single("image"), createProduct);

router.route("/getAll").get(isAuthenticated, getAllProducts);

router.route("/delete/:id").delete(isAuthenticated, checkAdmin, deleteProduct);

router.route("/getSingle/:id").get(isAuthenticated, checkAdmin, getProductById);

router.route("/getall/men").get(isAuthenticated, getForMen);

router.route("/getall/women").get(isAuthenticated, getForWomen);

router.route("/getall/children").get(isAuthenticated, getForChildren);

router
  .route("/update/:id")
  .put(isAuthenticated, checkAdmin, upload.single("image"), updateProduct);

router
  .route("/getCategoryWiseProducts")
  .get(isAuthenticated, checkAdmin, getCategoryWiseProducts);

module.exports = router;
