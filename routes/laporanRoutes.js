const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.laporan.getAllLaporan);
router.put("/", controller.laporan.updateLaporan);
router.get("/:id", controller.laporan.getLaporanByid);
router.delete("/:id", controller.laporan.deleteLaporan);

module.exports = router;
