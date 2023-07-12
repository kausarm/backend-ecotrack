const Sequelize = require("sequelize");
const db = require("../database/mysql");
const  provinces  = require("./provinces");

let regencies = db.define(
  "regencies",
  {
    id: { type: Sequelize.CHAR, primaryKey: true },
    name: Sequelize.STRING,
    province_id: { type: Sequelize.CHAR },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

regencies.belongsTo(provinces, { foreignKey: "province_id", targetKey: "id" });


module.exports = regencies;
