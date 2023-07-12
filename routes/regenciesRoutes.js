const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/:province_id", controller.kabupaten.getRegenciesByIdProvinsi);

module.exports = router;
