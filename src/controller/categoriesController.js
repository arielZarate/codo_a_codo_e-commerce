// controllers/categoriasController.js

const db = require("../db/db");

// Obtener todas las categorías
const obtenerTodasLasCategorias = (req, res) => {
  const sql = "SELECT * FROM categorias";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener todas las categorías:", err);
      return res.status(500).json({
        message: "Error al obtener todas las categorías.",
        error: err.message,
      });
    }

    res.json(result);
  });
};

// Obtener categoría por ID
const obtenerCategoriaPorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categorias WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error al obtener la categoría con ID ${id}:`, err);
      return res.status(500).json({
        message: `Error al obtener la categoría con ID ${id}.`,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: `No se encontró ninguna categoría con ID ${id}.`,
      });
    }

    res.json(result[0]);
  });
};

// Crear una nueva categoría
const crearCategoria = (req, res) => {
  const { nombreCategoria } = req.body;
  const sql = "INSERT INTO categorias (nombreCategoria) VALUES (?)";

  db.query(sql, [nombreCategoria], (err, result) => {
    if (err) {
      console.error("Error al crear una nueva categoría:", err);
      return res.status(500).json({
        message: "Error al crear una nueva categoría.",
        error: err.message,
      });
    }

    res.json({
      message: "Categoría creada exitosamente.",
      nueva_categoria: {
        id: result.insertId,
        nombreCategoria,
      },
    });
  });
};

// Actualizar una categoría por ID
const actualizarCategoria = (req, res) => {
  const { id } = req.params;
  const { nombreCategoria } = req.body;
  const sql = "UPDATE categorias SET nombreCategoria = ? WHERE id = ?";

  db.query(sql, [nombreCategoria, id], (err, result) => {
    if (err) {
      console.error(`Error al actualizar la categoría con ID ${id}:`, err);
      return res.status(500).json({
        message: `Error al actualizar la categoría con ID ${id}.`,
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró ninguna categoría con ID ${id}.`,
      });
    }

    res.json({
      message: `Categoría con ID ${id} actualizada exitosamente.`,
      categoria_actualizada: {
        id,
        nombreCategoria,
      },
    });
  });
};

// Eliminar una categoría por ID
const eliminarCategoria = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categorias WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error al eliminar la categoría con ID ${id}:`, err);
      return res.status(500).json({
        message: `Error al eliminar la categoría con ID ${id}.`,
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró ninguna categoría con ID ${id}.`,
      });
    }

    res.json({
      message: `Categoría con ID ${id} eliminada exitosamente.`,
      affectedRows: result.affectedRows,
    });
  });
};

module.exports = {
  obtenerTodasLasCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
