const Sequelize = require("sequelize");
const db = require("../database/mysql");

let roleUser = db.define(
  "role",
  {
    id: { type: Sequelize.CHAR, autoIncrement: true, primaryKey: true },
    name: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = roleUser;
