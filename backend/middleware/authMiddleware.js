const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   check the authorization header and also weather it is "Bearer" token.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from the header we are splitting the header since
      // it has the form of "Bearer aihfci", and after the split it will
      // be turned in to an array where the "Bearer" is the [0] and the
      // toke is [1].
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token.
      // "-password" is telling our request we don't want the password sent.
      req.user = await User.findById(decoded.id).select("-password");
      // call the next piece of middleware.
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized.");
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token.");
    }
  }
});

module.exports = { protect };
