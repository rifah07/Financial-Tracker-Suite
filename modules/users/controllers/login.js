const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist";

  const confirmPassword = await bcrypt.compare(password, getUser.password);

  if (!confirmPassword) throw "Email and Password do not match";

  const accessToken = await jsonwebtoken.sign(
    {
      _id: getUser._id,
      name: getUser.name,
    },
    process.env.jwt_salt
  );

  //success response

  res.status(200).json({
    status: "Success",
    message: "Login Successful",
    accessToken: accessToken,
  });
};

module.exports = login;