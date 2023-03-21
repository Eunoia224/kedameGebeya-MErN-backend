const express = require("express");
const router = express.Router();

// the controllers
const {
  getProduct,
  getProducts,
  getFromUser,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/specific").get(protect, getFromUser);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct);

module.exports = router;
