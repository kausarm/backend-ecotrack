const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.jenis_tps.getAllJenisTps);

module.exports = router;
