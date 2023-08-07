const Sequelize = require("sequelize");
const db = require("../database/mysql");
const provinces = require("./provinces");
const regencies = require("./regencies");
const districts = require("./districts");
const villages = require("./villages");
const rolesModel = require("./roleUser");
const group = require("./piket");

let users = db.define(
  "users",
  {
    nik: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nama: Sequelize.STRING,
    id_karyawan: Sequelize.STRING,
    email: Sequelize.STRING,
    hp: Sequelize.STRING,
    grup_piket: Sequelize.INTEGER,
    provinsi: Sequelize.CHAR,
    kabupaten: Sequelize.CHAR,
    kecamatan: Sequelize.CHAR,
    kelurahan: Sequelize.CHAR,
    level_user: Sequelize.CHAR,
    password: Sequelize.STRING,
    photo: { type: Sequelize.STRING, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

users.removeAttribute('id');


users.belongsTo(provinces, { foreignKey: "provinsi", targetKey: "id" });
users.belongsTo(regencies, { foreignKey: "kabupaten", targetKey: "id" });
users.belongsTo(districts, { foreignKey: "kecamatan", targetKey: "id" });
users.belongsTo(villages, { foreignKey: "kelurahan", targetKey: "id" });
users.belongsTo(rolesModel, { foreignKey: "level_user", targetKey: "id" });
users.belongsTo(group, { foreignKey: "grup_piket", targetKey: "id" });

module.exports = users;
