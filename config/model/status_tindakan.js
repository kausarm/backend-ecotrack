const Sequelize = require("sequelize");
const db = require("../database/mysql");

let status_tindakan = db.define(
  "status_tindakan",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = status_tindakan;
