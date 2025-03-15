const express = require("express");
const usersModel = require("../../models/users.model");
const register = require("./controllers/register");
const login = require("./controllers/login");

const userRoutes = express.Router();

// routes here

userRoutes.post("/register", register);
userRoutes.post("/login", login);

module.exports = userRoutes;