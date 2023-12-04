const connection = require("../../config/mysql");

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getUserByUser: (username) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMessage}`));
          }
        }
      );
    }),
  // verifyUser: (data, id) =>
  //   new Promise((resolve, reject) => {
  //     connection.query(
  //       "UPDATE user SET status = ? WHERE id = ?",
  //       [data, id],
  //       (err, result) => {
  //         if (!err) {
  //           resolve(result);
  //         } else {
  //           reject(new Error(`SQL : ${err.sqlMessage}`));
  //         }
  //       }
  //     );
  //   }),
};
