// routes/categoriasRoutes.js

const express = require("express");
const router = express.Router();
const categoriasController = require("../controller/categoriesController");

router.get("/", categoriasController.obtenerTodasLasCategorias);
router.get("/:id", categoriasController.obtenerCategoriaPorId);
router.post("/", categoriasController.crearCategoria);
router.put("/:id", categoriasController.actualizarCategoria);
router.delete("/:id", categoriasController.eliminarCategoria);

module.exports = router;
