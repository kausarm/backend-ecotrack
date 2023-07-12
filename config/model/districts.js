const Sequelize = require("sequelize");
const db = require("../database/mysql");
const  regencies  = require("./regencies");

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


districts.belongsTo(regencies,{foreignKey:"regency_id", targetKey:"id"});

module.exports = districts;
