const db = require("../db/db");

const ObtenerTodosLosUsuarios = (req, res) => {
  try {
    const sql = "SELECT * FROM usuarios";

    db.query(sql, (err, result) => {
      if (err) throw err;

      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({
          message: "No hay usuarios registrados",
        });
      }
    });
  } catch (error) {
    console.error(error);
    //return res.status(500).json(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const ObtenerUsuarioPorId = (req, res) => {
  try {
    const { id } = req.params; //destructuring. De los parámetros que le pasen extrae el id
    const sql =
      "SELECT * FROM usuarios WHERE id = ?"; /*el ? es un valor que será reemplazado
        por el valor que pasemos de id por params*/
    db.query(sql, [id], (err, result) => {
      if (err) throw err;

      // console.log(result);

      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({
          message: "No existe un usuario por ese id , vertifique el id ",
        });
      }
    });
  } catch (error) {
    console.error(error);
    //return res.status(500).json(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const crearUsuario = (
  req,
  res //debo agregarle try y catch
) => {
  try {
    const { nombre, apellido, domicilio, telefono, email, contrasena } =
      req.body; //destructuring
    const sql =
      "INSERT INTO usuarios (nombre, apellido, domicilio, telefono, email,contrasena) VALUES (?, ?, ?, ?, ?,?)";
    //Sentencia de sql que dice insertame los valores en la tabla usuarios reemplazando los signos de pregunta

    db.query(
      sql,
      [nombre, apellido, domicilio, telefono, email, contrasena],
      (err, result) => {
        if (err) throw err;
        //con db.query ejecuto la consulta

        // console.log(result);

        if (result.insertId !== undefined) {
          res.json({
            message: "Usuario Creado",
            status: 201,
            userId: result.insertId,
          });
        } else {
          return res.status(500).json({
            message: "No se ha podido crear el usuario",
            status: 500,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    //return res.status(500).json(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const ActualizarUsuario = (req, res) => {
  try {
    const { id } = req.params;
    //const { nombre, apellido, mail } = req.body; era la lìnea original pero me fallaba actualizar usuario
    const { nombre, apellido, domicilio, telefono, email, contrasena } =
      req.body;

    const sql =
      "UPDATE usuarios SET nombre = ?, apellido = ?, domicilio = ?,telefono = ?, email = ?,contrasena = ?  WHERE id = ?";
    db.query(
      sql,
      [nombre, apellido, domicilio, telefono, email, contrasena, id],
      (err, result) => {
        if (err) throw err;

        //console.log(result);

        if (result.affectedRows === 0) {
          return res.status(404).json({
            message:
              "Usuario no encontrado no se ha podido actualizar , verifique el id",
            status: 404,
          });
        } else {
          res.json({
            message: "Usuario editado con exito",
            status: 200,
            affectedRows: result.affectedRows,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const BorrarUsuario = (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM usuarios WHERE id= ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;

      //  console.log(result);
      if (result.affectedRows > 0) {
        return res.status(200).json({
          message: "Usuario eliminado",
          status: 200,
          affectedRows: result.affectedRows,
        });
      } else {
        return res.status(404).json({
          message: "Usuario no encontrado , no se ha podido eliminar",
          status: 404,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  ObtenerTodosLosUsuarios,
  ObtenerUsuarioPorId,
  crearUsuario,
  ActualizarUsuario,
  BorrarUsuario,
};
