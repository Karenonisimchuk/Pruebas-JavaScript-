document.addEventListener("DOMContentLoaded", () => {
// Lista de productos
const listaProductos = [
  {
    id: 1,
    nombre: "Remera",
    codigo: "5453",
    precioprenda: "3999",
    disponibles: 22,
    imagen: "./img/Wineem-remera.jpg",
  },
  {
    id: 2,
    nombre: "Pantalon",
    codigo: "1133",
    precioprenda: "5599",
    disponibles: 42,
    imagen: "./img/Wineem-pantalon.jpg",
  },
  {
    id: 3,
    nombre: "Buzo",
    codigo: "3415",
    precioprenda: "6599",
    disponibles: 12,
    imagen: "./img/Wineem-buzo.jpg",
  },
  {
    id: 4,
    nombre: "Campera",
    codigo: "4213",
    precioprenda: "8799",
    disponibles: 23,
    imagen: "./img/Wineem-campera.jpg",
  },
  {
    id: 5,
    nombre: "Ropa interior",
    codigo: "0012",
    precioprenda: "999",
    disponibles: 92,
    imagen: "./img/Wineem-intimo.jpg",
  },
  {
    id: 6,
    nombre: "Pijama",
    codigo: "0034",
    precioprenda: "2999",
    disponibles: 40,
    imagen: "./img/Wineem-pijama.jpg",
  },


];

// Carrito
let carrito = [];
  const valor = "$";
  const producto = document.querySelector("#producto");
  const itemCarrito = document.querySelector("#carrito");
  const total = document.querySelector("#total");
  const botonVaciar = document.querySelector("#boton-vaciar");
  const LOCSTORAGE = window.localStorage;

// Estructura productos
  function imprimirProductos() {
    listaProductos.forEach((info) => {
      // Estructura
      const nodo = document.createElement("div");
      nodo.classList.add("card", "col-sm-4");
      // Body
      const nodoBody = document.createElement("div");
      nodoBody.classList.add("card-body");
      // Titulo
      const nodoTitulo = document.createElement("h5");
      nodoTitulo.classList.add("card-title");
      nodoTitulo.textContent = info.nombre;
      // Imagen
      const nodoImagen = document.createElement("img");
      nodoImagen.classList.add("img-fluid");
      nodoImagen.setAttribute("src", info.imagen);
      // Codigo
      const nodoCodigo = document.createElement("p");
      nodoCodigo.classList.add("card-text");
      nodoCodigo.textContent = `${valor}${info.codigo}`;
      // Disponibles
      const nodoDisponible = document.createElement("p");
      nodoDisponible.classList.add("card-text");
      nodoDisponible.textContent = `${valor}${info.disponibles}`;
      // Precio
      const nodoPrecio = document.createElement("p");
      nodoPrecio.classList.add("card-text");
      nodoPrecio.textContent = `${valor}${info.precioprenda}`;
      // Boton
      const nodoBoton = document.createElement("button");
      nodoBoton.classList.add("btn", "btn-primary");
      nodoBoton.textContent = "+";
      nodoBoton.setAttribute("marcador", info.id);
      nodoBoton.addEventListener("click", agregarProducto);
      // Insertamos
      nodoBody.appendChild(nodoImagen);
      nodoBody.appendChild(nodoTitulo);
      nodoBody.appendChild(nodoCodigo);
      nodoBody.appendChild(nodoDisponible);
      nodoBody.appendChild(nodoPrecio);
      nodoBody.appendChild(nodoBoton);
      nodo.appendChild(nodoBody);
      producto.appendChild(nodo);
    });
  }

// Agregar producto
  function agregarProducto(evento) {
    carrito.push(evento.target.getAttribute("marcador"));
  
    imprimirCarrito();
    guardarCarrito();
  }
 
  // imprimir carrito con productos seleccionados
  function imprimirCarrito() {
    itemCarrito.textContent = "";
    const sinDuplicados = [...new Set(carrito)];
    sinDuplicados.forEach((item) => {
      const ITEM = listaProductos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });

      const UNIDADESITEM = carrito.reduce((total, itemId) => {
        return itemId === item ? (total += 1) : total;
      }, 0);

      const nodo = document.createElement("li");
      nodo.classList.add("list-group-item", "text-right", "mx-2");
      nodo.textContent = `${UNIDADESITEM} x ${ITEM[0].nombre} - ${valor}${ITEM[0].precioprenda}`;
  
      const boton = document.createElement("button");
      boton.classList.add("btn", "btn-danger", "mx-5");
      boton.textContent = "X";
      boton.style.marginLeft = "1rem";
      boton.dataset.item = item;
      boton.addEventListener("click", borrarItem);

      nodo.appendChild(boton);
      itemCarrito.appendChild(nodo);
    });
  
    total.textContent = calcularTotal();
  }

  // borrar del carrito
  function borrarItem(evento) {
    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });

    imprimirCarrito();
    guardarCarrito();
  }


// Precio total
  function calcularTotal() {
    return carrito
      .reduce((total, item) => {
        const ITEM = listaProductos.filter((itemBaseDatos) => {
          return itemBaseDatos.id == item;
        });
        return parseInt(total) + parseInt(ITEM[0].precioprenda);
      }, 0);
    }

  function vaciarCarrito() {
    carrito = [];
    imprimirCarrito();
    localStorage.clear();
  }

  function guardarCarrito() {
    LOCSTORAGE.setItem("carrito", JSON.stringify(carrito));
  }
  function cargarCarrito() {
    if (LOCSTORAGE.getItem("carrito") !== null) {
      carrito = JSON.parse(LOCSTORAGE.getItem("carrito"));
    }
  }


  botonVaciar.addEventListener("click", vaciarCarrito);


// buscador?
  let lista = document.querySelector(".collection");
  let txtbusca = document.getElementById("search");

  txtbusca.onkeyup = function () {
    lista.innerHTML = "";
    let texto = txtbusca.value.toLowerCase();

    for (let listaProductos2 of listaProductos) {
      let res = listaProductos2.nombre.toLowerCase();
      if (res.indexOf(texto) !== -1) {
        lista.innerHTML += `
        <a href='#' class='collection-item'>${listaProductos2.nombre}</a>
      `;
      }
    }
    if (lista.innerHTML == "") {
      lista.innerHTML = `
        <a href='#' class='collection-item'>No hay resultados</a>
        `;
    }
  };

  cargarCarrito();
  imprimirProductos();
  imprimirCarrito();
});