const {Sequelize} = require('sequelize')

const db = new Sequelize(
  "freedb_db_ecotrack",
  "freedb_kausarm",
  "z@#tdnBP$9#m6wU",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
  }
);
// const db = new Sequelize("db_ecotrack", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });


module.exports = db;