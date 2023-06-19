const Sequelize = require("sequelize");
const db = require("../database/mysql");
const provinces = require("./provinces");
const regencies = require("./regencies");
const districts = require("./districts");
const villages = require("./villages");
const kondisi = require("./kondisi");

let laporan = db.define(
  "laporan",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    provinsi: Sequelize.CHAR,
    kabupaten: Sequelize.CHAR,
    kecamatan: Sequelize.CHAR,
    kelurahan: Sequelize.CHAR,
    pin: Sequelize.STRING,
    tps: Sequelize.CHAR,
    tanggal: Sequelize.DATE,
    kondisi_tps: Sequelize.INTEGER,
    deskripsi: Sequelize.STRING,
    gambar: { type: Sequelize.BLOB, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

laporan.belongsTo(provinces, { foreignKey: "provinsi", targetKey: "id" });
laporan.belongsTo(regencies, { foreignKey: "kabupaten", targetKey: "id" });
laporan.belongsTo(districts, { foreignKey: "kecamatan", targetKey: "id" });
laporan.belongsTo(villages, { foreignKey: "kelurahan", targetKey: "id" });
laporan.belongsTo(kondisi, { foreignKey: "kondisi_tps", targetKey: "id" });

module.exports = laporan;

