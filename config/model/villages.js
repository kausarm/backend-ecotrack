const Sequelize = require("sequelize");
const db = require("../database/mysql");

let villages = db.define(
  "villages",
  {
    id: { type: Sequelize.CHAR, primaryKey: true },
    district_id: Sequelize.CHAR,
    name: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = villages;
