const express = require("express");

const Router = express.Router();
// const helloRoutes = require("../modules/hello/helloRoutes");
const stockItemsRoutes = require("../modules/stockItems/stockItemsRoutes");
const ordersRoutes = require("../modules/orders/ordersRoutes");
// const bookingRoutes = require("../modules/booking/bookingRoutes");
const authRoutes = require("../modules/auth/authRoutes");
const userRoutes = require("../modules/user/userRoutes");
// const seatBookingRoutes = require("../modules/booking/seatBookingRoutes");

// Router.use("/hello", helloRoutes);
Router.use("/stock", stockItemsRoutes);
Router.use("/orders", ordersRoutes);
// Router.use("/booking", bookingRoutes);
// Router.use("/seat", seatBookingRoutes);
Router.use("/auth", authRoutes);
Router.use("/user", userRoutes);

module.exports = Router;
