const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.dataWilayah.getAllDataWilayah);
router.post("/", controller.dataWilayah.creaDataWilayah);
router.get("/:id_kecamatan/by-kec", controller.dataWilayah.getAllDataByIdKec);
router.put("/:id", controller.dataWilayah.updateDataWilayah);
router.delete("/:id", controller.dataWilayah.deleteDataWilayah);
router.post("/predict", controller.dataWilayah.predict);

module.exports = router;
