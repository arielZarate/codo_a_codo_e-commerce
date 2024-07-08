// Función para verificar el rol de usuario
function verificarRolUsuario() {
  const userRole = localStorage.getItem("userRole");

  if (userRole === "isAdmin") {
    // Mostrar el enlace al dashboard
    const dashboardLinkContainer = document.getElementById(
      "dashboardLinkContainer"
    );
    if (dashboardLinkContainer) {
      dashboardLinkContainer.style.display = "block";
    }

    //si ya se cargo el boton dashboard mostrar el mismo

    // Configurar evento click para el enlace al dashboard
    const dashboardLink = document.getElementById("dashboardLink");
    if (dashboardLink) {
      dashboardLink.addEventListener("click", cargarYMostrarDashboard);
    }
  }
}

// Función para cargar y mostrar el dashboard
function cargarYMostrarDashboard(event) {
  event.preventDefault();

  // Aquí puedes agregar la lógica para cargar y mostrar el dashboard
  console.log("Cargando y mostrando el dashboard...");

  // Por ejemplo, podrías redirigir a la página del dashboard
  window.location.href = "./dashboard/dashboard.html";
}

//crear usuarios

// Evento DOMContentLoaded para iniciar la verificación del rol de usuario
document.addEventListener("DOMContentLoaded", verificarRolUsuario);

//========================================
