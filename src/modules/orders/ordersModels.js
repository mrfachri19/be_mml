const connection = require("../../config/mysql");

module.exports = {
  getAllOrders: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE employee LIKE '%${search}%' ORDER BY ${sort}  LIMIT ? OFFSET ?`,
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
  getCountOrders: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM orders WHERE name LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),

  postOrders: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO orders SET ?",
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
  updateOrders: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE orders SET ? WHERE id = ?",
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
  getOrdersId: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM orders WHERE id = ?",
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
  getOrdersbyEMployeeId: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM orders WHERE employeeId = ?",
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
  // deleteSchedule: (id) =>
  //   new Promise((resolve, reject) => {
  //     connection.query("DELETE FROM schedule WHERE id = ?", id, (error) => {
  //       if (!error) {
  //         resolve(id);
  //       } else {
  //         reject(new Error(`SQL : ${error.sqlMessage}`));
  //       }
  //     });
  //   }),
  // getScheduleByDateStartAndEnd: (dateStart, dateEnd) =>
  //   new Promise((resolve) => {
  //     connection.query(
  //       "SELECT * FROM schedule WHERE dateStart = ? AND dateEnd = ?",
  //       [dateStart, dateEnd],
  //       (error, results) => {
  //         if (!error) {
  //           resolve(results);
  //         } else {
  //           // eslint-disable-next-line no-new
  //           new Error(`Message : ${error.message}`);
  //         }
  //       }
  //     );
  //   }),
};
