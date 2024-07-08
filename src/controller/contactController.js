// controllers/contactoController.js
const db = require("../db/db"); // Asegúrate de tener configurada tu base de datos

// Función para crear un nuevo contacto

const crearContacto = (req, res) => {
  const { nombre, apellido, email, telefono, descripcion } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre || !apellido || !email || !telefono || !descripcion) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  // Crear el contacto en la base de datos
  const query =
    "INSERT INTO contactos (nombre, apellido, email, telefono, descripcion) VALUES (?, ?, ?, ?, ?)";
  const values = [nombre, apellido, email, telefono, descripcion];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al crear el contacto:", err);
      return res
        .status(500)
        .json({ error: "Ocurrió un error al crear el contacto." });
    }

    res.status(201).json({
      message: "Contacto creado exitosamente.",
      status: 201,
      result,
    });
  });
};

// Función para obtener todos los contactos
const obtenerTodosLosContactos = (req, res) => {
  const query = "SELECT * FROM contactos";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los contactos:", err);
      return res
        .status(500)
        .json({ error: "Ocurrió un error al obtener los contactos." });
    }

    res.status(200).json(results);
  });
};

module.exports = {
  crearContacto,
  obtenerTodosLosContactos,
};
