//------------------MOSTRAR PRODUCTOS-----------------------

const mostrarTodosLosProductos = async () => {
  try {
    let response = await fetch("/api/productos");
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const productos = await response.json();
    // console.log(productos);
    const containerProductos = document.getElementById("productos-container");
    containerProductos.innerHTML = "";

    let row; // Variable para almacenar la fila actual

    productos.forEach((producto, index) => {
      // Crear una nueva fila cada 4 productos o al inicio
      if (index % 4 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4"); // Agregar margen inferior para separar las filas
        containerProductos.appendChild(row);
      }

      // Crear una columna para cada producto
      const col = document.createElement("div");
      col.classList.add("col-lg-3", "col-md-4", "col-sm-6"); // Tamaños de columna responsivos
      col.innerHTML = `
        <div class="card">
          <img src="${producto.imagen_url}" alt="${producto.nombre}" class="img-fluid">
          <div class="card-body">
            <h6 class="card-title">${producto.nombre}</h6>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">Precio: €${producto.precio}</p>
            <p class="card-text">Talla: ${producto.talla}</p>
          </div>
        </div>
      `;
      row.appendChild(col); // Agregar la columna al row actual
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

// Llamar a la función para cargar categorías y mostrar productos cuando se carga el DOM
document.addEventListener("DOMContentLoaded", async () => {
  mostrarTodosLosProductos(); // Mostrar todos los productos inicialmente
});

// Agregar evento para mostrar productos según la categoría seleccionada
