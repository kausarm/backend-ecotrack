const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.dataTindakan.getAllDataTindakan);
router.post("/", controller.dataTindakan.creaDataTindakan);
router.delete("/:id", controller.dataTindakan.deleteDataTindakan);

module.exports = router;
