const Sequelize = require("sequelize");
const db = require("../database/mysql");
const districts = require("./districts");

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

villages.belongsTo(districts, { foreignKey: "district_id", targetKey: "id" });


module.exports = villages;
