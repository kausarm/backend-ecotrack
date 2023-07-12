const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.dataTindakan.getAllDataTindakan);
router.post("/", controller.dataTindakan.creaDataTindakan);

module.exports = router;
