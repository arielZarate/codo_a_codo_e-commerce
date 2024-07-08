// Ejemplo en el frontend (HTML + JavaScript)
// Aquí se utiliza fetch para enviar la solicitud POST al endpoint /api/logout

const cerrarSesion = async () => {
  try {
    const response = await fetch("/api/cerrarSesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Opcional: Incluir un cuerpo de solicitud JSON si es necesario
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }

    // localStorage.setItem("userRole", "");
    localStorage.removeItem("userRole");

    alert("Sesion cerrada con exito");

    setTimeout(() => {
      // Manejar la respuesta después de cerrar sesión, por ejemplo, redirigir al usuario
      window.location.href = "../../index.html"; // Redirige a la página de inicio u otra página adecuada
    }, 1000);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    // Manejar errores si es necesario
  }
};

// Asignar el evento click al botón de cerrar sesión
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion);
