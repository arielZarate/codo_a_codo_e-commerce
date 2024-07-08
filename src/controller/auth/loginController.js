const db = require("../../db/db");

const iniciarSesion = async (req, res) => {
  const { email, contrasena } = req.body;

  // Verificar que se reciban email y contraseña
  if (!email || !contrasena) {
    return res
      .status(400)
      .json({ error: "Por favor, ingrese email y contraseña." });
  }

  const rol = req.session.isAdmin ? "isAdmin" : "isUser";
  try {
    // Consultar el usuario en la base de datos
    const sql = "SELECT * FROM usuarios WHERE email = ? AND contrasena = ?";
    db.query(sql, [email, contrasena], (err, result) => {
      if (err) {
        console.error("Error al buscar usuario en la base de datos:", err);
        return res.status(500).json({
          message: "Error al buscar usuario en la base de datos.",
          error: err.message,
        });
      }

      //===================express-sesion==========================================

      //console.log(result)
      // Verificar si se encontró un usuario con ese email y contraseña
      if (result.length === 1) {
        // Usuario autenticado correctamente
        const usuario = result[0];
        const isAdmin = usuario.email === "admin@gmail.com"; //harcodeado

        // Asignar rol al usuario
        usuario.rol = isAdmin ? "isAdmin" : "isUser";

        // Guardar datos del usuario en la sesión
        req.session.usuario = usuario;
        if (isAdmin) {
          req.session.isAdmin = true;
        }

        //  console.log(usuario);
        //===================express-sesion==========================================
        return res.json({
          message: "Inicio de sesión exitoso",
          // le mando un 200 para verificarlo en el front
          status: 200,
          user: usuario,
        });
      } else {
        // Usuario no encontrado o credenciales incorrectas

        return res.status(401).json({
          error: "Credenciales de inicio de sesión incorrectas",
          status: 401,
        });
      }
    });
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  iniciarSesion,
};
