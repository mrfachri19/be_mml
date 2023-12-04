const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
        position,
        role,
      } = req.body;

      // PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
      const checkUser = await authModel.getUserByUser(username);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 409, `Email already used`, null);
      }

      // Proses Validasi input form
      if (
        email.length < 1 ||
        password.length < 1 ||
        username.length < 1 ||
        firstName.length < 1 ||
        lastName.length < 1 ||
        position.length < 1 ||
        phone.length < 1 ||
        role.length < 1
      ) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);

      const setData = {
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        position,
        phone,
        role,
      };

      const result = await authModel.register(setData);
      return helperWrapper.response(
        res,
        200,
        "Success register user, please verify your email",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request, ${error.message}`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const checkUser = await authModel.getUserByUser(username);
      // console.log(checkUser)
      // Proses Validasi input form
      if (username.length < 1 || password.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      const passwordUser = await bcryptjs.compare(
        password,
        checkUser[0].password
      );
      // console.log(checkUser[0]);
      if (!passwordUser) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "14h",
      });
      // Add refresh token
      const refreshToken = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "12h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
        email: payload.email,
        username: payload.username,
        nama: payload.firstName + " " + payload.lastName,
        position: payload.position,
        role: payload.role
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  // verifyUser: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const result = await userModel.getUserById(id);
  //     if (result.length < 1) {
  //       return helperWrapper.response(
  //         res,
  //         404,
  //         `User by id ${id} not found`,
  //         null
  //       );
  //     }

  //     await authModel.verifyUser("active", id);
  //     return helperWrapper.response(res, 200, "Email verification success");
  //   } catch (error) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `Bad Request, ${error.message}`,
  //       null
  //     );
  //   }
  // },
  // logout: async (req, res) => {
  //   try {
  //     let token = req.headers.authorization;
  //     token = token.split(" ")[1];

  //     redis.setex(`accessToken:${token}`, 3600 * 24, token);

  //     return helperWrapper.response(res, 200, "Success logout", null);
  //   } catch (err) {
  //     return helperWrapper.response(
  //       res,
  //       400,
  //       `Bad Request (${err.message})`,
  //       null
  //     );
  //   }
  // },
};
