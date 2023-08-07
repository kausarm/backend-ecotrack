const users = require('./users');
const provinces= require('./provinces');
const regencies= require('./regencies');
const districts= require('./districts');
const villages= require('./villages');
const roleUser = require('./roleUser');
const kondisi = require('./kondisi');
const laporan = require('./laporan');
const jenis_tps = require('./jenis_tps');
const tps = require('./tps');
const piket = require('./piket');
const notifTugas = require('./notif_tugas');
const statusTindakan = require('./status_tindakan');
const dataWilayah = require('./data_wilayah');
const dataTindakan = require('./data_tindakan');
const armada = require('./armada');

const model = {}

model.users = users
model.provinces = provinces
model.regencies = regencies
model.districts = districts;
model.villages = villages;
model.roleUser = roleUser;
model.kondisi = kondisi;
model.laporan = laporan;
model.jenis_tps = jenis_tps;
model.tps = tps;
model.piket = piket;
model.notifTugas = notifTugas;
model.statusTindakan = statusTindakan;
model.dataWilayah = dataWilayah;
model.dataTindakan = dataTindakan;
model.armada = armada;


module.exports = model;