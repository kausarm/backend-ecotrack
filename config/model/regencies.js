const Sequelize = require("sequelize");
const db = require("../database/mysql");

let regencies = db.define(
  "regencies",
  {
    id: { type: Sequelize.CHAR, primaryKey: true },
    name: Sequelize.STRING,
    province_id: Sequelize.CHAR,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = regencies;
