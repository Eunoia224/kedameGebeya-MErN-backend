const asyncHandler = require("express-async-handler");
const Products = require("../models/productModel");
const User = require("../models/userModel");
// @desc Get Products
// @route GET /products
// access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  res.status(200).json(products);
});

// @desc Get A single Product
// @route GET /products/:id
// access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)

  res.status(200).json(product);
});

// @desc Get A single Product of my creation
// @route GET /products/specific
// access Public
const getFromUser = asyncHandler(async (req, res) => {
  const products = await Products.find({ user: req.user.id });
  res.status(200).json(products);
});

// @desc Create Product
// @route POST /products
// access Private
const createProduct = asyncHandler(async (req, res) => {
  // if user sends empty fields
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please fill the required fields.");
  }
  const product = await Products.create({
    user: req.user.id,
    name: req.body.name,
    mainImg: req.body.main_img,
    img_1: req.body.img_1,
    img_2: req.body.img_2,
    img_3: req.body.img_3,
    img_4: req.body.img_4,
    img_5: req.body.img_5,
    img_6: req.body.img_6,
    img_7: req.body.img_7,
    category: req.body.category,
    color: req.body.color,
    manufacturer: req.body.manufacturer,
    weight: req.body.weight,
    itemsIncluded: req.body.items_included,
    typeOfItem: req.body.type_of_item,
    price: req.body.price,
    detail: req.body.detail,
    quantity: req.body.quantity,
    sale: req.body.sale,
    salePrice: req.body.sale_price,
    salePercentage: req.body.sale_percentage,
    reviewStars: req.body.review_stars,
    reviews: req.body.reviews,
  });
  res.status(200).json(product);
});

// @desc Update Product
// @route PUT /products/:id
// access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  }
  // const user = await User.findById(req.user.id)
  // check for user
  if (!req.user) {
    res.status(401);
    throw newError("User Not Found.");
  }
  // make sure the logged in user matches with the creator of the product.
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  // new: true => create it if it doesn't exist.
  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

// @desc Delete Product
// @route DELETE /products/:id
// access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product was not found.");
  }
  const user = await User.findById(req.user.id);
  // check for the user.
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found.");
  }
  // make sure the logged in user matches with the creator of the product.
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized.");
  }
  await product.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  getProduct,
  getFromUser,
  createProduct,
  updateProduct,
  deleteProduct,
};
