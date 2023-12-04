const express = require("express");

const Router = express.Router();

const ordersController = require("./ordersController");
// const middlewareAuth = require("../../middleware/auth");

Router.get("/", ordersController.getAllOrders);
// Router.get(
//   "/:id",
//   middlewareAuth.authentication,
//   middlewareRedis.getScheduleByIdRedis,
//   scheduleController.getScheduleById
// );
Router.post("/create", ordersController.postOrders);
Router.patch("/update/:id", ordersController.updateOrders);
Router.get("/orderemployee/:id", ordersController.getStockByemployeeid);
// Router.delete(
//   "/delete/:id",
//   middlewareAuth.authentication,
//   middlewareAuth.isAdmin,
//   middlewareRedis.clearScheduleRedis,
//   scheduleController.deleteSchedule
// );

module.exports = Router;
