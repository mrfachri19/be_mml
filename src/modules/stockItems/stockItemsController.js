/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const stockItemsModel = require("./stockItemsModel");
const helperWrapper = require("../../helper/wrapper");
// const deleteFile = require("../../helper/upload/deleteFile");

module.exports = {
  getAllStockItems: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "name ASC";

      let offset = page * limit - limit;
      const totalData = await stockItemsModel.getCountStockItems(search);
      const totalPage = Math.ceil(totalData / limit);

      if (totalPage < page) {
        offset = 0;
        page = 1;
      }

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await stockItemsModel.getAllStockItems(
        limit,
        offset,
        search,
        sort
      );

      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Data not found !`, []);
      }

      return helperWrapper.response(
        res,
        200,
        "Success get data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  postStock: async (req, res) => {
    try {
      const { name, category, qty, uom, location, status } = req.body;
      const setData = {
        name,
        category,
        qty,
        uom,
        location,
        status
      };
      const result = await stockItemsModel.postStockItems(setData);
      return helperWrapper.response(res, 200, "Succes create data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  updateStockItems: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await stockItemsModel.getStockItems(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      const {
        name,
        category,
        qty,
        uom,
        location,
      } = req.body;
      const setData = {
        name,
        category,
        qty,
        uom,
        location,
        updatedAt: new Date(Date.now()),
      };
      // untuk mengupdate salah satu field saja
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });

      const result = await stockItemsModel.updateStock(setData, id);
      return helperWrapper.response(res, 200, "succes update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  getStockByid: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await stockItemsModel.getStockItems(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "succes get data by id", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  // deleteMovie: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const checkId = await movieModel.getMovieById(id);
  //     if (checkId.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by id ${id} not found !`,
  //         null
  //       );
  //     }

  //     const result = await movieModel.deleteMovie(id);
  //     deleteFile(`public/uploads/movie/${checkId[0].image}`);
  //     return helperWrapper.response(res, 200, "succes delete data", result);
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
  // getMovieUpcomming: async (request, response) => {
  //   try {
  //     const { date } = request.query;
  //     const upcommingMovies = await movieModel.upcommingMovie(date);
  //     if (upcommingMovies.length < 1) {
  //       return helperWrapper.response(response, 404, "Movie not found!", null);
  //     }
  //     return helperWrapper.response(
  //       response,
  //       200,
  //       "Success Get data upcomming movie!",
  //       upcommingMovies
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       response,
  //       400,
  //       `Bad Request ${error.message}`,
  //       null
  //     );
  //   }
  // },
};
