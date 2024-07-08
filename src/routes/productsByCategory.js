const express = require("express");
const router = express.Router();
const {
  obtenerProductosPorCategoria,
} = require("../controller/productsByCategoryController");

// Rutas para productos por categorias
//es un filtro es la unica ruta
//atento debe tener el mismo nombre de id en la funcion
router.get("/:idCategoria", obtenerProductosPorCategoria);

module.exports = router;
