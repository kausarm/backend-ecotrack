const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/:district_id", controller.kelurahan.getKelurahanByIdKecamatan);

module.exports = router;
