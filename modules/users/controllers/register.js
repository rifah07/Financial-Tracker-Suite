const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  //validations

  if (!email) throw "E-mail must be provided.";
  if (!password) throw "Password must be provided.";
  if (password.length < 5)
    throw "Password must be at least 5 caharacters long.";
  if (!name) throw "Name must be provided.";
  if (password !== confirm_password)
    throw "Looks like password and confirm password does not match.";
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail)
    throw "This email already has an account, try with another E-mail";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = await jwtManager(createdUser);

  res.status(201).json({
    status: "Congratulations! You've registered successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;