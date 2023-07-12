const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.tps.getAllTps);
router.post("/", controller.tps.createTps);
router.get("/:id", controller.tps.getTpsById);
router.put("/:id", controller.tps.updateTps);
router.delete("/:id", controller.tps.deleteTps);

module.exports = router;
