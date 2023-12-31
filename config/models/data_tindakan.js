const Sequelize = require("sequelize");
const db = require("../database/mysql");
const districts = require("./districts");
const tps_model = require("./tps");
const users = require("./users");
const armada = require("./armada");

let data_tindakan = db.define(
  "data_tindakan",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kecamatan: Sequelize.CHAR,
    tps: Sequelize.INTEGER,
    kepadatan: Sequelize.FLOAT,
    penduduk: Sequelize.FLOAT,
    luas: Sequelize.FLOAT,
    sampah: Sequelize.FLOAT,
    plat_nomor: Sequelize.INTEGER,
    gambar: { type: Sequelize.BLOB, allowNull: true },
    create_by: Sequelize.STRING,
    tanggal: Sequelize.DATEONLY,
    deskripsi: Sequelize.STRING,
    jam: Sequelize.TIME,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

data_tindakan.belongsTo(districts, {
  foreignKey: "id_kecamatan",
  targetKey: "id",
});
data_tindakan.belongsTo(tps_model, {
  foreignKey: "tps",
  targetKey: "id",
});
data_tindakan.belongsTo(users, {
  foreignKey: "create_by",
  targetKey: "nik",
});
data_tindakan.belongsTo(armada, {
  foreignKey: "plat_nomor",
  targetKey: "id",
});

module.exports = data_tindakan;
