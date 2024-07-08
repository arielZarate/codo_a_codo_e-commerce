// routes/categoriasRoutes.js

const express = require("express");
const router = express.Router();
const contactoController = require("../controller/contactController");

router.get("/", contactoController.obtenerTodosLosContactos);

router.post("/", contactoController.crearContacto);

module.exports = router;
