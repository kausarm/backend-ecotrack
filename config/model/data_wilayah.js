const Sequelize = require("sequelize");
const db = require("../database/mysql");
const districts = require("./districts");

let data_wilayah = db.define(
  "data_wilayah",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kepadatan: Sequelize.FLOAT,
    penduduk: Sequelize.FLOAT,
    luas: Sequelize.FLOAT,
    id_kecamatan: Sequelize.CHAR,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

data_wilayah.belongsTo(districts, {
  foreignKey: "id_kecamatan",
  targetKey: "id",
});

module.exports = data_wilayah;
