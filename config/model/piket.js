const Sequelize = require("sequelize");
const db = require("../database/mysql");

let piket = db.define(
  "piket",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: Sequelize.STRING,
    wilayah_kerja: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = piket;
