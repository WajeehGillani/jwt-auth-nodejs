const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../database/models/User");
const { registerValidation, loginValidation } = require("../utils/validations");

router.post("/register", async (req, res) => {
  //validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //user already exist
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("User already Exit");

  // hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    await user.save();
    res.send({ user: user.id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  //validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //user already exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found!");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password not correct");

  const token = jwt.sign({ _id: user._id }, process.env.secretKey);
  res.header("auth-token", token).send(token);
});

module.exports = router;
