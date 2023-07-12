const users = require('./userController');
const roleUser = require('./roleController');
const kondisi = require('./kondisiController');
const laporan = require('./laporanController');
const tps = require('./tpsController');
const piket = require('./piketController');
const notifTugas = require("./notifTugasController");
const provinsi = require("./provinciesController");
const kabupaten = require("./regenciesController");
const kecamatan = require("./kecamatanController");
const kelurahan = require("./kelurahanController");
const jenis_tps = require("./jenisTpsController");
const statusTindakan = require("./statusTindakanController");
const dataWilayah = require("./dataWilayahController");
const dataTindakan = require("./dataTindakanController");

const controller = {};

controller.users = users;
controller.roleUser = roleUser;
controller.kondisi = kondisi;
controller.laporan = laporan;
controller.tps = tps;
controller.piket = piket;
controller.notifTugas = notifTugas;
controller.provinsi = provinsi;
controller.kabupaten = kabupaten;
controller.kecamatan = kecamatan;
controller.kelurahan = kelurahan;
controller.jenis_tps = jenis_tps;
controller.statusTindakan = statusTindakan;
controller.dataWilayah = dataWilayah;
controller.dataTindakan = dataTindakan;

module.exports = controller;