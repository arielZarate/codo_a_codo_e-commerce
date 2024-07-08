// routes/categoriasRoutes.js

const express = require("express");
const router = express.Router();
const loginController = require("../../controller/auth/loginController");

router.post("/", loginController.iniciarSesion);

module.exports = router;
