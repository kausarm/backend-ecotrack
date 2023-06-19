const users = require('./userController');
const roleUser = require('./roleController');
const kondisi = require('./kondisiController');
const laporan = require('./laporanController');

const controller = {};

controller.users = users;
controller.roleUser = roleUser;
controller.kondisi = kondisi;
controller.laporan = laporan;

module.exports = controller;