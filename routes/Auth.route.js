const express = require("express");
const { Register, Login } = require("../controllers/Auth.controllers");

const Auth_Router = express.Router();

Auth_Router.post("/register", Register);
Auth_Router.post("/login", Login);

module.exports = Auth_Router;
