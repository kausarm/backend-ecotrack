const users = require('./users');
const provinces= require('./provinces');
const regencies= require('./regencies');
const districts= require('./districts');
const villages= require('./villages');
const roleUser = require('./roleUser');
const kondisi = require('./kondisi');
const laporan = require('./laporan');

const model = {}

model.users = users
model.provinces = provinces
model.regencies = regencies
model.districts = districts;
model.villages = villages;
model.roleUser = roleUser;
model.kondisi = kondisi;
model.laporan = laporan;


module.exports = model;