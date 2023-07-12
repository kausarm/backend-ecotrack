const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/", controller.notifTugas.createTugas);
router.get("/", controller.notifTugas.getAllTugas);
router.put("/:id", controller.notifTugas.updateTugas);
router.get("/:id", controller.notifTugas.getTugasByid);
router.get("/:grup_piket/by-piket", controller.notifTugas.getTugasByGroupPiket);
router.delete("/:id", controller.notifTugas.deleteTugas);

module.exports = router;
