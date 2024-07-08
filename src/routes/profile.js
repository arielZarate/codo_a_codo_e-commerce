const express = require("express");
const router = express.Router();
const perfilController = require("../controller/profileController");

router.get("/", perfilController.obtenerPerfil);

module.exports = router;
