const Sequelize = require('sequelize');
const db = require('../database/mysql');

let provinces = db.define(
  "provinces",
  {
    id: { type: Sequelize.CHAR,primaryKey: true },
    name: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// provinces.removeAttribute('id');
module.exports = provinces;