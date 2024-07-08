const loginForm = document.getElementById("loginForm");

const iniciarSesion = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  if (loginForm.checkValidity()) {
    // Validación adicional del correo electrónico
    if (!validarEmail(email)) {
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("email").classList.remove("is-valid");
    } else {
      document.getElementById("email").classList.add("is-valid");
      document.getElementById("email").classList.remove("is-invalid");
    }

    if (!validarContrasena(contrasena)) {
      document.getElementById("contrasena").classList.add("is-valid");
      document.getElementById("contrasena").classList.remove("is-invalid");
    } else {
      document.getElementById("contrasena").classList.add("is-valid");
      document.getElementById("contrasena").classList.remove("is-invalid");
    }

    // Aquí puedes agregar el código para enviar los datos al servidor
    console.log(email, contrasena);

    /// y una vez que tiene todo validado ejecuta el fetch
    try {
      // Realiza el fetch para el login

      const result = await fetch("/api/iniciarsesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasena }),
      });

      // console.log(result);

      if (!result.status === 200) {
        throw new Error("Error al iniciar sesión");
      }
      const response = await result.json();
      console.log(response);

      //============== Almacena el rol del usuario en localStorage===================================
      localStorage.setItem("userRole", response.user.rol);

      //================================================================================================
      alert(response.message);

      setTimeout(() => {
        window.location.href = "../../index.html";
      }, 1500);
    } catch (error) {
      console.error(error.message);
      alert("Error al iniciar sesión,CREDENCIALES INCORRECTAS.");
    }
  }

  //=========explicacion de codigo================
  // Añade la clase "was-validated" a la form para que se muestren los errores de validación
  // esto trabaja junto a las clases de html
  //    class="needs-validation"
  //<div class="invalid-feedback">Por favor, ingrese una contraseña válida.</div>

  loginForm.classList.add("was-validated");
};

//=========validar email=====================

const validarEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

//validar contraseña

function validarContrasena(contrasena) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(contrasena));
}

//======================agregar funcion al evento==========================================
loginForm.addEventListener("submit", iniciarSesion);
