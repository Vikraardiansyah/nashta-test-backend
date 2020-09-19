const connection = require("../config/mysql");

module.exports = {
  getCountData: search => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) FROM data WHERE title LIKE "${search}" OR participants LIKE "${search}" OR location LIKE "${search}"`,
        (err, result) => {
          if (!err) {
            resolve(result[0]["COUNT(*)"]);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getData: (search, page) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM data WHERE title LIKE "${search}" OR participants LIKE "${search}" OR location LIKE "${search}" LIMIT ${page},5`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getDataNoLimit: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM data`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  postData: setData => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO data SET ?", setData, (err, result) => {
        if (!err) {
          const newData = {
            id: result.insertId,
            ...setData,
          };
          resolve(newData);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
