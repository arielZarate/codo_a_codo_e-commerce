document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".needs-validation");

  const EnviarDatosContacto = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (validarFormulario()) {
      const data = {
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
      };

      try {
        const result = await fetch("/api/contactos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log(result);
        const resp = await result.json();

        if (!resp.status === 201) {
          throw new Error("Error al crear la consulta.");
        }

        alert("Consulta enviada con exitosamente.");

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1500);
      } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al enviar el formulario.");
      }
    }

    form.reset();
  };

  form.addEventListener("submit", EnviarDatosContacto);

  //================formularipo=================================
  function validarFormulario() {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const descripcionInput = document.getElementById("descripcion");

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const email = emailInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const descripcion = descripcionInput.value.trim();

    let formValido = true;

    // Resetear estilos y mensajes de error
    nombreInput.classList.remove("is-invalid");
    apellidoInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-invalid");
    telefonoInput.classList.remove("is-invalid");
    descripcionInput.classList.remove("is-invalid");

    if (nombre === "") {
      nombreInput.classList.add("is-invalid");
      formValido = false;
    }

    if (apellido === "") {
      apellidoInput.classList.add("is-invalid");
      formValido = false;
    }

    if (email === "") {
      emailInput.classList.add("is-invalid");
      formValido = false;
    } else if (!validarEmail(email)) {
      emailInput.classList.add("is-invalid");
      formValido = false;
    }

    if (telefono === "") {
      telefonoInput.classList.add("is-invalid");
      formValido = false;
    } else if (!validarTelefono(telefono)) {
      telefonoInput.classList.add("is-invalid");
      formValido = false;
    }

    if (descripcion === "") {
      descripcionInput.classList.add("is-invalid");
      formValido = false;
    }

    return formValido;
  }

  function validarEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validarTelefono(telefono) {
    const numberPattern = /^\d+$/;
    return numberPattern.test(telefono);
  }
});
