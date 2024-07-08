//opcion 2 de validacion  atrves de js sin usar clases de boostrap

let login = document.getElementById("loginForm");

const iniciarSesion = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  // Validar los datos de login
  let isValid = validarLogin(email, contrasena);

  if (isValid) {
    try {
      //aca realizo el fect y envio los datos
      console.log(email, contrasena);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  login.reset(); //Limpia los campos del formulario al enviar
};

//=========validar login=====================
function validarLogin(email, contrasena) {
  if (email.trim() === "" || contrasena.trim() === "") {
    alert("Por favor, ingrese todos los campos.");
    return false;
  }

  //llama a una funcion de afuera el email
  if (!validarEmail(email)) {
    alert("Por favor, ingrese un email válido.");
    return false;
  }
  //llama a una funcion de afuera contraseña
  if (!validarContrasena(contrasena)) {
    alert(
      "Por favor, ingrese una contraseña válida. Debe tener al menos 8 caracteres, incluir letras mayúsculas y minúsculas, números y caracteres especiales."
    );
    return false;
  }

  return true;
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validarContrasena(contrasena) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(contrasena));
}

//======================agregar funcion al evento==========================================
login.addEventListener("submit", iniciarSesion);
