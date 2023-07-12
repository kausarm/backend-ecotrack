const Sequelize = require("sequelize");
const db = require("../database/mysql");
const kondisi = require("./kondisi");
const tps = require("./tps");
const user = require("./users");

let laporan = db.define(
  "laporan",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    status_tindakan: Sequelize.INTEGER,
    tps: Sequelize.INTEGER,
    tanggal: Sequelize.DATEONLY,
    kondisi_tps: Sequelize.INTEGER,
    deskripsi: Sequelize.STRING,
    gambar: { type: Sequelize.BLOB, allowNull: true },
    create_by: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

laporan.belongsTo(kondisi, { foreignKey: "kondisi_tps", targetKey: "id" });
laporan.belongsTo(tps, { foreignKey: "tps", targetKey: "id" });
laporan.belongsTo(user, { foreignKey: "create_by", targetKey: "nik" });

module.exports = laporan;

