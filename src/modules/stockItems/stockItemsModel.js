const connection = require("../../config/mysql");

module.exports = {
  getAllStockItems: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM stockItems WHERE name LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),
  getCountStockItems: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM stockItems WHERE name LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),
  postStockItems: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO stockItems SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      // eslint-disable-next-line no-console
      console.log(query.sql);
    }),
  getStockItems: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM stockItems WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

  updateStock: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE stockItems SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  // deleteMovie: (id) =>
  //   new Promise((resolve, reject) => {
  //     connection.query("DELETE FROM movie WHERE id = ?", id, (error) => {
  //       if (!error) {
  //         resolve(id);
  //       } else {
  //         reject(new Error(`SQL : ${error.sqlMessage}`));
  //       }
  //     });
  //   }),
  // upcommingMovie: (date) =>
  //   new Promise((resolve, reject) => {
  //     connection.query(
  //       "SELECT * FROM movie WHERE MONTHNAME(releaseDate) = ?",
  //       date,
  //       (error, results) => {
  //         if (!error) {
  //           resolve(results);
  //         } else {
  //           reject(new Error(`Message : ${error.message}`));
  //         }
  //       }
  //     );
  //   }),
};
