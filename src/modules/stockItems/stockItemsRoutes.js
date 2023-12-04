const express = require("express");

const Router = express.Router();

const stockItemsController = require("./stockItemsController");
// const middlewareAuth = require("../../middleware/auth");
//= ================================================================
// const middlewareUpload = require("../../middleware/uploadMovie");
//= ===================================================================

Router.get("/", stockItemsController.getAllStockItems);
Router.get("/:id", stockItemsController.getStockByid);
// Router.get("/upcomming", movieController.getMovieUpcomming);
Router.post("/", stockItemsController.postStock);
Router.patch("/:id", stockItemsController.updateStockItems);
// Router.delete(
//   "/:id",
//   middlewareAuth.authentication,
//   middlewareRedis.clearMovieRedis,
//   movieController.deleteMovie
// );

module.exports = Router;
