//==================perfil==========================0

// profileController.js

const obtenerPerfil = (req, res) => {
  // Acceder al usuario almacenado en la sesión
  const usuario = req.session.usuario;

  // Verificar si el usuario está autenticado
  if (!usuario) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const rol = req.session.isAdmin ? "isAdmin" : "isUser";
  // console.log(usuario);

  // Devolver los datos del usuario como respuesta
  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    telefono: usuario.telefono,
    domicilio: usuario.domicilio,
    email: usuario.email,
    role: rol,
  });
};

module.exports = {
  obtenerPerfil,
};
