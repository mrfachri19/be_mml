const helperWrapper = require("../../helper/wrapper");
const userModel = require("./userModel");


module.exports = {
  // getUserById: async (req, res) => {
  //   try {
  //     const { id } = req.decodeToken;
  //     const result = await userModel.getUserById(id);
  //     if (result.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `data by ${id} not found !`,
  //         null
  //       );
  //     }
  //     // PROSES UNTUK MENYIMPAN DATA KE DALAM REDIS
  //     // =====
  //     redis.setex(`getUser:${id}`, 3600, JSON.stringify(result));
  //     // ======
  //     return helperWrapper.response(res, 200, "succes get data by id", result);
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },

  // updateUser: async (request, response) => {
  //   try {
  //     const userId = request.decodeToken.id;
  //     const { body } = request;
  //     const user = await userModel.getUserById(userId);
  //     const setBody = {
  //       ...body,
  //       image: request.file ? request.file.filename : user[0].image,
  //     };
  //     if (user[0].id !== userId) {
  //       return helperWrapper.response(response, 404, "user not found!", null);
  //     }
  //     const newDataProfile = await userModel.updateUser(setBody, userId);
  //     if (user[0].image === null) {
  //       return helperWrapper.response(
  //         response,
  //         200,
  //         "Success Update Profile!",
  //         newDataProfile
  //       );
  //     }

  //     if (request.file && fs.existsSync(`${user[0].image}`)) {
  //       deleteFile(`public/uploads/user/${user[0].image}`);
  //       return helperWrapper.response(
  //         response,
  //         200,
  //         "Success update profile!!",
  //         newDataProfile
  //       );
  //     }
  //     deleteFile(`public/uploads/user/${user[0].image}`);
  //     return helperWrapper.response(
  //       response,
  //       200,
  //       "Success update profile!!",
  //       newDataProfile
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       response,
  //       `Bad Request : ${error.message}`,
  //       null
  //     );
  //   }
  // },
  // updatePassword: async (req, res) => {
  //   try {
  //     const { id } = req.decodeToken;
  //     const { newPassword, confirmPassword } = req.body;

  //     const user = await userModel.getUserById(id);
  //     if (user.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `Get data user by id ${id} not found`,
  //         null
  //       );
  //     }

  //     if (newPassword !== confirmPassword) {
  //       return helperWrapper.response(
  //         res,
  //         400,
  //         `Password does not match`,
  //         null
  //       );
  //     }

  //     const salt = await bcryptjs.genSalt(10);
  //     const passwordHash = await bcryptjs.hash(newPassword, salt);

  //     const setData = { password: passwordHash };

  //     const result = await userModel.updateUser(setData, id);

  //     return helperWrapper.response(res, 200, `Success update password`, {
  //       id: result.id,
  //     });
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `Bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
  // updateImage: async (req, res) => {
  //   try {
  //     const { id } = req.decodeToken;

  //     const user = await userModel.getUserById(id);
  //     if (user.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `Get data user by id ${id} not found`,
  //         null
  //       );
  //     }

  //     if (user[0].image) {
  //       deleteFile(`public/uploads/user/${user[0].image}`);
  //     }

  //     const setData = {
  //       image: req.file ? req.file.filename : null,
  //       updatedAt: new Date(Date()),
  //     };

  //     const result = await userModel.updateUser(setData, id);
  //     return helperWrapper.response(
  //       res,
  //       200,
  //       "Success update image user",
  //       result
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `Bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
  // getDashboardUser: async (req, res) => {
  //   try {
  //     let { movieId, location, premiere } = req.query;
  //     movieId = movieId || "";
  //     premiere = premiere || "";
  //     location = location || "";
  //     const result = await userModel.getDashboardUser(
  //       movieId,
  //       location,
  //       premiere
  //     );
  //     if (result.length < 1) {
  //       return helperWrapper.response(res, 200, "Data not found", []);
  //     }

  //     const newResult = result.map((item) => {
  //       const data = {
  //         ...item,
  //         month: item.month.slice(0, 3),
  //       };

  //       return data;
  //     });

  //     return helperWrapper.response(
  //       res,
  //       200,
  //       "Success get data dashboard",
  //       newResult
  //     );
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `Bad request (${error.message})`,
  //       null
  //     );
  //   }
  // },
  getAllUser: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "firstName ASC";

      let offset = page * limit - limit;
      const totalData = await userModel.getCountUsers(search);
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

      const result = await userModel.getAllUsers(
        limit,
        offset,
        search,
        sort,
        { role: 'employee' } 
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
};
