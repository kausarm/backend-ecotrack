const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/:regency_id", controller.kecamatan.getKecamatanByIdKabupaten);

module.exports = router;
