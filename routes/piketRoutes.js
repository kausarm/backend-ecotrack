const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.piket.getAllPiket);
router.delete("/:id", controller.piket.deletePiket);
router.post("/", controller.piket.createPiket);

module.exports = router;
