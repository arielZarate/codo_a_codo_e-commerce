const cerrarSesion = (req, res) => {
  console.log(req.session);

  // Destruye la sesión del usuario

  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }

    // Redirige o devuelve una respuesta adecuada después de cerrar sesión
    res.json({ message: "Sesión cerrada correctamente" });
  });

  // return res.json("cerrar session");
};

module.exports = {
  cerrarSesion,
};
