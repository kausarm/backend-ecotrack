const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.laporan.getAllLaporan);

module.exports = router;
