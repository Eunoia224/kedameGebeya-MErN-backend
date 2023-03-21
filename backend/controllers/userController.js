const asyncHandler = require(`express-async-handler`);
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc Register new user
// @route POST /users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, avatar, deliveryAddress } =
    req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields.");
  }
  // validate if a user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(`Seems like the user with email: ${email} exists.`);
  }
  // hash the passwords
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);
 const user = await User.create({
   firstName,
   lastName,
   email,
   password: hashedPassword,
   avatar,
   deliveryAddress,
 });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data, try again.");
  }
});

// @desc Authenticate a user
// @route POST /users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials, try again.");
  }
});

// @desc Get user data
// @route GET /users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email, createdAt, updatedAt } = await User.findById(req.user.id);
  res.status(200).json(req.user);
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //expires in 6 hours could be 10d (10 days)
    expiresIn: "6h",
  });
};
module.exports = { registerUser, loginUser, getMe };
