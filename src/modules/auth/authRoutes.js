const express = require("express");

const Router = express.Router();
const authController = require("./authController");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
// Router.post("/logout", authController.logout);
// Router.get("/verify-email/:id", authController.verifyUser);

module.exports = Router;
