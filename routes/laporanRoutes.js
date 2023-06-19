const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/", controller.laporan.createLaporan);
router.get("/", controller.laporan.getAllLaporan);
router.put("/:id", controller.laporan.updateLaporan);
router.get("/:id", controller.laporan.getLaporanByid);
router.delete("/:id", controller.laporan.deleteLaporan);

module.exports = router;
