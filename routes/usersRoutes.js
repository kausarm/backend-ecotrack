const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.users.getAllUsers);
router.post("/", controller.users.createUser);
router.post("/login", controller.users.loginUser);
router.get("/:nik", controller.users.getUserByNik);
router.put("/:nik", controller.users.updateUser);
router.delete("/:nik", controller.users.deleteUser);
router.get("/:role/by-role", controller.users.getAllPetugasByRole);

module.exports = router;
