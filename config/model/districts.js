const Sequelize = require("sequelize");
const db = require("../database/mysql");

let districts = db.define(
  "districts",
  {
    id: { type: Sequelize.CHAR, primaryKey: true },
    regency_id: Sequelize.CHAR,
    name: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = districts;
