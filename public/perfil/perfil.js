async function mostrarPerfil(event) {
  event.preventDefault(); // Evitar que el enlace recargue la página

  try {
    const response = await fetch("/api/perfil/");
    if (!response.ok) {
      throw new Error("Error al obtener los datos del perfil");
    }
    const perfil = await response.json();

    // Llenar los datos en el modal
    document.getElementById("perfilModalLabel").textContent =
      "Perfil de " + perfil.nombre + " " + perfil.apellido;
    document.getElementById("perfilId").textContent = perfil.id;
    document.getElementById("perfilNombre").textContent = perfil.nombre;
    document.getElementById("perfilApellido").textContent = perfil.apellido;
    document.getElementById("perfilTelefono").textContent = perfil.telefono;
    document.getElementById("perfilDomicilio").textContent = perfil.domicilio;
    document.getElementById("perfilEmail").textContent = perfil.email;
    document.getElementById("perfilRole").textContent = perfil.role;

    // Mostrar el modal
    var perfilModal = new bootstrap.Modal(
      document.getElementById("perfilModal")
    );
    perfilModal.show();
  } catch (error) {
    console.error("Error al mostrar el perfil:", error);
    alert("Debe iniciar session para ver el perfil. ");
  }
}

const perfilLink = document.getElementById("perfilLink");
perfilLink.addEventListener("click", mostrarPerfil);
