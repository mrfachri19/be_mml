// const moment = require("moment");
const ordersModel = require("./ordersModels");
const helperWrapper = require("../../helper/wrapper");
const ordersModels = require("./ordersModels");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "name ASC";

      let offset = page * limit - limit;
      const totalData = await ordersModel.getCountOrders(search);
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

      const result = await ordersModel.getAllOrders(
        limit,
        offset,
        search,
        sort,
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
  getStockByemployeeid: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ordersModels.getOrdersbyEMployeeId(id);
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
  // getScheduleFilterByDateStartEnd: async (request, response) => {
  //   try {
  //     const { dateStart, dateEnd } = request.query;
  //     const schedules = await scheduleModel.getScheduleByDateStartAndEnd(
  //       dateStart,
  //       dateEnd
  //     );
  //     const newDataSchedule = [];
  //     // eslint-disable-next-line array-callback-return
  //     schedules.map((value) => {
  //       const setNewValue = {
  //         ...value,
  //         time: value.time.split(","),
  //         dateStart: moment(value.dateStart).format("YYYY-MM-DD"),
  //         dateEnd: moment(value.dateEnd).format("YYYY-MM-DD"),
  //       };
  //       newDataSchedule.push(setNewValue);
  //     });
  //     if (newDataSchedule.length < 1) {
  //       return helperWrapper.response(
  //         response,
  //         404,
  //         "Schedule not found!",
  //         null
  //       );
  //     }
  //     return helperWrapper.response(
  //       response,
  //       200,
  //       "Success Get Data By Date Start and Date End!",
  //       newDataSchedule
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       response,
  //       400,
  //       `Bad Request ${error.message}`
  //     );
  //   }
  // },
  // getScheduleById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const result = await scheduleModel.getScheduleById(id);
  //     const newResult = result.map((item) => {
  //       const data = {
  //         ...item,
  //         time: item.time.split(","),
  //       };
  //       return data;
  //     });
  //     if (result.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by id ${id} not found !`,
  //         null
  //       );
  //     }

  //     redis.setex(`getSchedule:${id}`, 3600, JSON.stringify(result));

  //     return helperWrapper.response(
  //       res,
  //       200,
  //       "succes get data by id",
  //       newResult
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
  // getScheduleByIdMovie: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const result = await scheduleModel.getScheduleByIdMovie(id);
  //     const newResult = result.map((item) => {
  //       const data = {
  //         ...item,
  //         time: item.time.split(","),
  //       };
  //       return data;
  //     });
  //     if (result.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by id ${id} not found !`,
  //         null
  //       );
  //     }

  //     redis.setex(`getSchedule:${id}`, 3600, JSON.stringify(result));

  //     return helperWrapper.response(
  //       res,
  //       200,
  //       "succes get data by id",
  //       newResult
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
  postOrders: async (req, res) => {
    try {
      const {
        employeeId,
        employee,
        location,
        category,
        activity,
        division,
        machine,
        name,
        qty,
        uom,
        status,
      } = req.body;
      const setData = {
        employeeId,
        employee,
        location,
        category,
        activity,
        division,
        machine,
        name,
        qty,
        uom,
        status
      };

      const result = await ordersModel.postOrders(setData);
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
  updateOrders: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await ordersModel.getOrdersId(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      const {status } =
        req.body;
      const setData = {
        status,
        updatedAt: new Date(Date.now()),
      };
      // untuk mengupdate salah satu field saja
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });

      // masi butuh perbaikan
      // for (const data in setData) {
      //   if (!setData[data]) {
      //     delete setData[data];
      //   }
      // }

      const result = await ordersModel.updateOrders(setData, id);
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
  // deleteSchedule: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const checkId = await scheduleModel.getScheduleById(id);
  //     if (checkId.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by id ${id} not found !`,
  //         null
  //       );
  //     }

  //     const result = await scheduleModel.deleteSchedule(id);
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
};
