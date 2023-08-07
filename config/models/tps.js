const Sequelize = require("sequelize");
const db = require("../database/mysql");
const provinces = require("./provinces");
const regencies = require("./regencies");
const districts = require("./districts");
const villages = require("./villages");
const jenis = require("./jenis_tps");
const kondisi = require("./kondisi");

let tps = db.define(
  "tps",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pin: Sequelize.STRING,
    provinsi: Sequelize.CHAR,
    kabupaten: Sequelize.CHAR,
    kecamatan: Sequelize.CHAR,
    kelurahan: Sequelize.CHAR,
    nama: Sequelize.STRING,
    tanggal: Sequelize.DATEONLY,
    kapasitas: Sequelize.INTEGER,
    jenis_tps: Sequelize.CHAR,
    gambar: { type: Sequelize.STRING, allowNull: false },
    kondisi_tps: Sequelize.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


tps.belongsTo(provinces, { foreignKey: "provinsi", targetKey: "id" });
tps.belongsTo(regencies, { foreignKey: "kabupaten", targetKey: "id" });
tps.belongsTo(districts, { foreignKey: "kecamatan", targetKey: "id" });
tps.belongsTo(villages, { foreignKey: "kelurahan", targetKey: "id" });
tps.belongsTo(jenis, { foreignKey: "jenis_tps", targetKey: "id" });
tps.belongsTo(kondisi, { foreignKey: "kondisi_tps", targetKey: "id" });

module.exports = tps;
