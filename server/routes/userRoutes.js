const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
try {
const userExists = await User.findOne({ email: req.body.email });

if (userExists) {
  return res.send({
    success: false,
    message: "User already exists, Try to login",
  });
}

// Hashing password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
req.body.password = hashedPassword;

const newUser = new User(req.body);
await newUser.save();
res.json("User has been registered successfully");
} catch (err) {
res.json("Some error occurred: " + err);
}
});

router.post("/login", async (req, res) => {
try {
const user = await User.findOne({ email: req.body.email });
if (!user) {
return res.send({
success: false,
message: "User does not exist, Please register",
});
}

// Comparing password
const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) {
  return res.send({
    success: false,
    message: "Invalid password",
  });
}

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

res.send({
  success: true,
  message: "User has been logged in successfully",
  token: token,
});
} catch (err) {
res.send("Some error occurred: " + err);
}
});

module.exports = router;

