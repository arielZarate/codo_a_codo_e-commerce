const form = document.getElementById("registroForm");

async function RegsitrarUsuario(event) {
  event.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtén los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const domicilio = document.getElementById("domicilio").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  // Ejemplo de impresión de los datos en consola (simulando el envío a un servidor)
  //console.log("Datos del formulario:");
  //console.log(nombre, apellido, domicilio, telefono, email, contrasena);

  // Validar los datos usando la función validateUsuario
  const validation = validateUsuario(
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    contrasena
  );

  if (!validation.valid) {
    alert(validation.message);
    return;
  }

  const newUser = {
    nombre,
    apellido,
    domicilio,
    telefono,
    email,
    contrasena,
  };

  try {
    const res = await fetch("/api/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    //  console.log("Respuesta del servidor:", data); // Añadir esta línea para depurar la respuesta del servidor

    if (!data.status === 201) {
      throw new Error("Error al crear los usuario");
    }
    alert("Usuario creado con éxito.");

    // Redirige a index.html después de 2 segundos
    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 2000);
  } catch (error) {
    console.log("Error: " + error.message);
    alert("Ocurrió un error al crear el usuario.");
  }

  // Limpia el formulario si es necesario
  form.reset();
}

// Agrega un evento de escucha para el evento submit del formulario
form.addEventListener("submit", RegsitrarUsuario);

// Función para validar los campos del formulario
function validateUsuario(
  nombre,
  apellido,
  domicilio,
  telefono,
  email,
  contrasena
) {
  // Validación básica
  if (
    !nombre ||
    !apellido ||
    !domicilio ||
    !telefono ||
    !email ||
    !contrasena
  ) {
    return {
      valid: false,
      message: "Por favor completa todos los campos obligatorios.",
    };
  }

  // Validación de nombre y apellido: solo letras y espacios
  if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
    return {
      valid: false,
      message: "El nombre solo puede contener letras y espacios.",
    };
  }

  if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(apellido)) {
    return {
      valid: false,
      message: "El apellido solo puede contener letras y espacios.",
    };
  }

  // Validación de domicilio: texto alfanumérico y espacios
  if (!/^[a-zA-Z0-9\s]+$/.test(domicilio)) {
    return {
      valid: false,
      message: "El domicilio solo puede contener letras, números y espacios.",
    };
  }

  // Validación de teléfono: formato numérico con posibilidad de guiones y paréntesis
  if (!/^[\d()-]+$/.test(telefono)) {
    return {
      valid: false,
      message: "El teléfono solo puede contener números, guiones y paréntesis.",
    };
  }

  // Validación de email
  if (!/\S+@\S+\.\S+/.test(email)) {
    return {
      valid: false,
      message: "Por favor introduce un correo electrónico válido.",
    };
  }

  // Validación de contraseña: al menos 6 caracteres
  if (contrasena.length < 6) {
    return {
      valid: false,
      message: "La contraseña debe tener al menos 6 caracteres.",
    };
  }

  // Si pasa todas las validaciones
  return { valid: true };
}

//Nota: se puede complejizar mucho mas el codigo llevado al extremo , pero creo que esto cumple con lo requerido 😀
