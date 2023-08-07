const Sequelize = require("sequelize");
const db = require("../database/mysql");

let armada = db.define(
  "armada",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plat_nomor: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = armada;
