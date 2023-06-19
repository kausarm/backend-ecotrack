const Sequelize = require("sequelize");
const db = require("../database/mysql");

let kondisi = db.define(
  "kondisi",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = kondisi;
