const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.kondisi.getAllKondisi);

module.exports = router;
