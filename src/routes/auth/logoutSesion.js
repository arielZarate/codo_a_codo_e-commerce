const express = require("express");
const router = express.Router();
const logoutController = require("../../controller/auth/logoutSesionController"); // Importa el controlador para cerrar sesión

// Ruta para cerrar sesión
router.post("/", logoutController.cerrarSesion);

module.exports = router;
