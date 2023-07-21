const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.dataTindakan.getAllDataTindakan);
router.get("/:tgl_awal/:tgl_akhir/filter", controller.dataTindakan.getAllDataTindakanFilterByTgl);
router.post("/", controller.dataTindakan.creaDataTindakan);
router.delete("/:id", controller.dataTindakan.deleteDataTindakan);

module.exports = router;
