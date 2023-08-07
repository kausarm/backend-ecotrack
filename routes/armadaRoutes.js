const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.armada.getAllArmada);
router.delete("/:id", controller.armada.deleteArmada);
router.post("/", controller.armada.createArmada);

module.exports = router;
