const express = require("express");
const { Register, Login, Logout } = require("../controllers/Auth.controllers");

const Auth_Router = express.Router();

Auth_Router.post("/register", Register);
Auth_Router.post("/login", Login);
Auth_Router.get("/logout", Logout);

module.exports = Auth_Router;
