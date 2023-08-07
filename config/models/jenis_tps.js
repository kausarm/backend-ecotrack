const Sequelize = require("sequelize");
const db = require("../database/mysql");

let jenis_tps = db.define(
  "jenis_tps",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);



module.exports = jenis_tps;
