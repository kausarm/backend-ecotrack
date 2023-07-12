const Sequelize = require("sequelize");
const db = require("../database/mysql");
const tps = require("./tps");
const kondisi = require("./kondisi");
const piket = require("./piket");
const  laporan  = require("./laporan");

let notif_tugas = db.define(
  "notif_tugas",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_laporan: Sequelize.INTEGER,
    grup_piket: Sequelize.INTEGER,
    pelapor: Sequelize.STRING,
    tps_tindakan: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    status_tindakan: Sequelize.INTEGER,
    deskripsi: Sequelize.TEXT,
    waktu: Sequelize.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

notif_tugas.belongsTo(kondisi, { foreignKey: "status", targetKey: "id" });
notif_tugas.belongsTo(tps, { foreignKey: "tps_tindakan", targetKey: "id" });
notif_tugas.belongsTo(piket, { foreignKey: "grup_piket", targetKey: "id" });
notif_tugas.hasOne(laporan, {
  foreignKey: "status_tindakan",
  targetKey: "status_tindakan",
});

module.exports = notif_tugas;
