// Evento de submit del formulario
const updateForm = document.getElementById("updateForm");

const actualizarFormulario = async (event) => {
  event.preventDefault();

  let id = document.getElementById("userId").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let domicilio = document.getElementById("domicilio").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("contrasena").value;

  const upd_user = {
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    contrasena,
  };

  //fakta validar este parte pero la dejo asi , el formualrio de registro tiene la validacion
  try {
    const res = await fetch(`/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upd_user),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    alert("Usuario actualizado correctamente.");

    setTimeout(() => {
      updateForm.reset();
      // Redireccionar a la página de lista de usuarios u otra página relevante
      window.location.href = "../dashboard.html";
    }, 1200);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    alert("Ocurrió un error al actualizar el usuario.");
  }
};

updateForm.addEventListener("submit", actualizarFormulario);
