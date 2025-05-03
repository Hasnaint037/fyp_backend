const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  createOrder,
  getOrderCountsByCategory,
} = require("../controllers/order.controller");
const isAdmin = require("../middlewares/checkAdmin");

router.route("/place-order").post(isAuthenticated, createOrder);
router
  .route("/order-count")
  .get(isAuthenticated, isAdmin, getOrderCountsByCategory);

module.exports = router;
