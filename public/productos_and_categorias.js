//===========0categorias===========================================

// Función para cargar las categorías
// Función para cargar las categorías
const cargarCategorias = async () => {
  try {
    const response = await fetch("/api/categorias");
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }
    const categorias = await response.json();

    // Obtener el selector de categorías
    const selectCategorias = document.getElementById("selector-categorias");
    selectCategorias.innerHTML = ""; // Limpiar opciones anteriores

    // Agregar una opción para mostrar todos los productos
    const optionTodos = document.createElement("option");
    optionTodos.value = ""; // Valor vacío para mostrar todos los productos
    optionTodos.textContent = "Todos los productos";
    selectCategorias.appendChild(optionTodos);

    // Agregar una opción por cada categoría
    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.id; // Puedes usar el ID de la categoría como value
      option.textContent = categoria.nombreCategoria; // Nombre de la categoría visible
      selectCategorias.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

// Llamar a la función para cargar categorías cuando se carga el DOM
document.addEventListener("DOMContentLoaded", cargarCategorias);

//===========1Productos===========================================
//================================================================

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

// Agregar evento al selector de categorías para filtrar productos
const selectCategorias = document.getElementById("selector-categorias");
selectCategorias.addEventListener("change", async () => {
  const categoriaSeleccionada = selectCategorias.value;
  if (categoriaSeleccionada) {
    await mostrarProductosPorCategoria(categoriaSeleccionada);
  } else {
    mostrarTodosLosProductos();
  }
});

//=================================================================================

//=================================================================================

//=================================================================================

// Función para mostrar productos por categoría
const mostrarProductosPorCategoria = async (idCategoria) => {
  try {
    let url = `/api/productosXcategoria/${idCategoria}`;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los productos por categoría");
    }
    const productos = await response.json();
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
    console.error("Error al cargar productos por categoría:", error);
  }
};

// Llamar a la función para mostrar todos los productos cuando se carga el DOM
document.addEventListener("DOMContentLoaded", mostrarTodosLosProductos);
