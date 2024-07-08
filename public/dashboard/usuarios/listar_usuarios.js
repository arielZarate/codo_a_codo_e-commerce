//listo la tabla de usuarios primero cuando inicia

document.addEventListener("DOMContentLoaded", async () => {
  await listarUsuarios(); // Cargar automáticamente al iniciar la página
  //window.location.reload();
});

// Función para listar usuarios
const listarUsuarios = async () => {
  try {
    const res = await fetch("/api/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const users = await res.json();
    const tablaUsuariosBody = document.getElementById("tablaUsuariosBody");

    // Limpiar tabla antes de agregar datos
    tablaUsuariosBody.innerHTML = "";

    // Agregar filas a la tabla
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.domicilio}</td>
        <td>${user.telefono}</td>
        <td>${user.email}</td>
        <td>${user.contrasena}</td>
         <td>
          <button class="btn btn-warning btn-sm" onclick="CargarDataParaActualizar(${user.id})">Actualizar</button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="EliminarUsuario(${user.id})">Eliminar</button>
        </td>
      `;
      tablaUsuariosBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
};

//=============================================================

// Función para abrir formulario de actualización y almacenar datos en localStorage
const CargarDataParaActualizar = async (id) => {
  try {
    // Obtener los datos del usuario mediante fetch
    const res = await fetch(`/api/usuarios/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(res);
    if (!res.ok) {
      throw new Error("Error al obtener los datos del usuario");
    }

    const userData = await res.json();
    //console.log(userData[0]);
    // Almacenar los datos del usuario en localStorage para luegos cargarlos en el mismo formulario actualizar
    localStorage.setItem("userDataToUpdate", JSON.stringify(userData[0]));

    // Redirigir al formulario de actualización con el ID del usuario en la URL
    setTimeout(() => {
      window.location.href = `./usuarios/update_usuario.html?id=${id}`;
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

//================================================================

const EliminarUsuario = async (id) => {
  if (id) {
    if (confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        const res = await fetch(`/api/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Error al eliminar el usuario");
        }

        alert("Usuario eliminado correctamente.");

        // Recargar la página después de eliminar el usuario
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error(error);
        alert("Ocurrió un error al eliminar el usuario.");
      }
    }
  } else {
    alert("No hay usuario seleccionado para eliminar.");
  }
};

//=========================================================
// Mostrar sección específica y ocultar las demás
const mostrarSeccion = (seccionId) => {
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("d-none");
  });
  document.getElementById(seccionId).classList.remove("d-none");
};

// Agregar eventos a los enlaces del sidebar o botones según corresponda
document.getElementById("usuariosLink").addEventListener("click", () => {
  listarUsuarios();
  mostrarSeccion("usuarios");
});
