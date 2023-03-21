const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true
  },
  avatar: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
  },
},{
    timestamps: true
});
module.exports = mongoose.model("User", userSchema)