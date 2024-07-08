// Función para registrar usuarios

// Agregar evento de escucha al formulario
const form = document.getElementById("registroForm");

async function RegistrarUsuario(event) {
  event.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const domicilio = document.getElementById("domicilio").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

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

  console.log(newUser);

  // Intentar enviar los datos del nuevo usuario
  try {
    const res = await fetch("/api/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    //console.log("Respuesta del servidor:", data); // Depuración de la respuesta del servidor

    if (data.status !== 201) {
      throw new Error("Error al crear el usuario");
    }

    alert("Usuario creado con éxito.");

    // Redirigir a index.html después de 2 segundos
    setTimeout(() => {
      window.location.href = "../dashboard.html";
    }, 1000);

    // Recargar la página después de eliminar el usuario
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    alert("Ocurrió un error al crear el usuario.");
  }

  // Limpiar el formulario si es necesario
  form.reset();
}

form.addEventListener("submit", RegistrarUsuario);

//=============================================================

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
