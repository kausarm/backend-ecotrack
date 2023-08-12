const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.dataTindakan.getAllDataTindakan);
router.get("/:tgl_awal/:tgl_akhir/filter", controller.dataTindakan.getAllDataTindakanFilterByTgl);
router.get(
  "/:tanggal_awal/:tanggal_akhir/metode",
  controller.dataTindakan.getAllDataTindakanFilterMetode
);
router.post("/", controller.dataTindakan.creaDataTindakan);
router.post("/manual", controller.dataTindakan.creaDataTindakanManual);
router.delete("/:id", controller.dataTindakan.deleteDataTindakan);
router.put("/:id", controller.dataTindakan.updateTindakan);

module.exports = router;
