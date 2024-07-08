const db = require("../db/db");

// Obtener todos los productos
const obtenerTodosLosProductos = (req, res) => {
  const sql = "SELECT * FROM productos";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener todos los productos:", err);
      return res.status(500).json({
        message: "Error al obtener todos los productos.",
        error: err.message,
      });
    }

    res.json(result);
  });
};

// Obtener producto por ID
const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM productos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error al obtener el producto con ID ${id}:`, err);
      return res.status(500).json({
        message: `Error al obtener el producto con ID ${id}.`,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: `No se encontró ningún producto con ID ${id}.`,
      });
    }

    res.json(result[0]);
  });
};

// Crear un nuevo producto
const crearProducto = (req, res) => {
  const { nombre, descripcion, precio, id_categoria, foto } = req.body;
  const sql =
    "INSERT INTO productos (nombre, descripcion, precio, id_categoria ) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [nombre, descripcion, precio, id_categoria, foto],
    (err, result) => {
      if (err) {
        console.error("Error al crear un nuevo producto:", err);
        return res.status(500).json({
          message: "Error al crear un nuevo producto.",
          error: err.message,
        });
      }

      res.json({
        message: "Producto creado exitosamente.",
        nuevo_producto: {
          id: result.insertId,
          nombre,
          descripcion,
          precio,
          id_categoria,
          foto,
        },
      });
    }
  );
};

// Actualizar un producto por ID
const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, id_categoria } = req.body;
  const sql =
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ? WHERE id = ?";

  db.query(
    sql,
    [nombre, descripcion, precio, id_categoria, id],
    (err, result) => {
      if (err) {
        console.error(`Error al actualizar el producto con ID ${id}:`, err);
        return res.status(500).json({
          message: `Error al actualizar el producto con ID ${id}.`,
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: `No se encontró ningún producto con ID ${id}.`,
        });
      }

      res.json({
        message: `Producto con ID ${id} actualizado exitosamente.`,
        producto_actualizado: {
          id,
          nombre,
          descripcion,
          precio,
          id_categoria,
        },
      });
    }
  );
};

// Eliminar un producto por ID
const eliminarProducto = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error al eliminar el producto con ID ${id}:`, err);
      return res.status(500).json({
        message: `Error al eliminar el producto con ID ${id}.`,
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró ningún producto con ID ${id}.`,
      });
    }

    res.json({
      message: `Producto con ID ${id} eliminado exitosamente.`,
      affectedRows: result.affectedRows,
    });
  });
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};

/*
const ObtenerTodosLosProductos = (req, res) => {
    try {
        const sql = 'SELECT * FROM productos';

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerProductosPorCategoria = (req, res) => {
    try {
        const sql = 'SELECT * FROM productos ORDER BY categoria';

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerVestidos = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('vestidos')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerSudaderas = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('sudaderas')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}
const ObtenerPantalonesCortos = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('pantalones cortos')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerPantalones = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('pantalones')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerFaldas = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('faldas')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerCamisetas = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('camisetas')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerBlusas = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('blusas')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerAbrigos = (req, res) => {
    try {
        const sql = "SELECT * FROM productos WHERE categoria IN ('abrigos')";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}


module.exports = {
    ObtenerTodosLosProductos,
    ObtenerProductosPorCategoria,
    ObtenerVestidos,
    ObtenerSudaderas,
    ObtenerPantalonesCortos,
    ObtenerPantalones,
    ObtenerFaldas,
    ObtenerCamisetas,
    ObtenerBlusas,
    ObtenerAbrigos
}


*/
