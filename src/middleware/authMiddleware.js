const authMiddleware = (req, res, next) => {
  if (!req.session.usuario) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (!req.session.usuario) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Acceso solo para administradores" });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};

/** 
const verificarCredenciales = (req, res, next) => {
  const { email, contrasena } = req.body;

  // Verificar que se reciban email y contraseña
  if (!email || !contrasena) {
    return res
      .status(400)
      .json({ error: "Por favor, ingrese email y contraseña." });
  }

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

    // Verificar si se encontró un usuario con ese email y contraseña
    if (result.length === 1) {
      // Usuario autenticado correctamente
      req.usuario = result[0]; // Adjuntar datos del usuario al objeto request
      next(); // Permitir que la solicitud continúe hacia la siguiente función
    } else {
      // Usuario no encontrado o credenciales incorrectas
      return res.status(401).json({
        error: "Credenciales de acceso incorrectas.",
      });
    }
  });
};

module.exports = verificarCredenciales;
*/
