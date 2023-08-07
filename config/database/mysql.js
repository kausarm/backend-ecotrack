const {Sequelize} = require('sequelize')

const db = new Sequelize("db_ecotrack", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


module.exports = db;