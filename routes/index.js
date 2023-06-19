const users = require('./usersRoutes');
const roleUser = require('./roleRoutes');
const kondisi = require('./kondisiRoutes');
const laporan = require('./laporanRoutes');
const routes = {}

routes.users = users;
routes.roleUser = roleUser; 
routes.kondisi = kondisi; 
routes.laporan = laporan; 


module.exports = routes;