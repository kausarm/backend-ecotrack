const users = require('./usersRoutes');
const roleUser = require('./roleRoutes');
const kondisi = require('./kondisiRoutes');
const laporan = require('./laporanRoutes');
const tps = require('./tpsRoutes');
const piket = require('./piketRoutes');
const notifTugas = require('./notifTugasRoutes');
const provinsi = require('./provinciesRoutes');
const kabupaten = require('./regenciesRoutes');
const kecamatan = require('./kecamatanRoutes');
const kelurahan = require('./kelurahanRoutes');
const jenis_tps = require('./jenisTpsRoutes');
const statusTindakan = require('./statusTindakanRoutes');
const dataWilayah = require('./dataWilayahRoutes');
const dataTindakan = require('./dataTindakanRoutes');
const routes = {}

routes.users = users;
routes.roleUser = roleUser; 
routes.kondisi = kondisi; 
routes.laporan = laporan; 
routes.tps = tps; 
routes.piket = piket; 
routes.notifTugas = notifTugas; 
routes.provinsi = provinsi; 
routes.kabupaten = kabupaten; 
routes.kecamatan = kecamatan; 
routes.kelurahan = kelurahan; 
routes.jenis_tps = jenis_tps; 
routes.statusTindakan = statusTindakan; 
routes.dataWilayah = dataWilayah; 
routes.dataTindakan = dataTindakan; 


module.exports = routes;