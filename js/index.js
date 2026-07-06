import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// traigo los productos de dota
const renderizarProductos = () => {
  const contenedor = document.getElementById("contenedor-tarjetas");
  if (!contenedor) return;

  // hago el fetch del json
  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) => {
      contenedor.innerHTML = "";
      
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const dl = document.createElement("dl");
        dl.classList.add("item-detalle");

        for (const [key, value] of Object.entries(producto.detalles || {})) {
          const dt = document.createElement("dt");
          dt.textContent = key;
          const dd = document.createElement("dd");
          dd.textContent = value;
          dl.appendChild(dt);
          dl.appendChild(dd);
        }

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-primary", "text-dark");
        boton.textContent = "Comprar";
        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(dl);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log("error al cargar:", error));
};

// cuando carga la pagina
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});
