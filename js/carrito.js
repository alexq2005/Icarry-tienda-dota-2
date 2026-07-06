import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

// muestro el carrito
const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  if (!contenedor || !divAcciones) return;

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito está vacío 🛒🕸️";

    contenedor.appendChild(mensaje);
    return;
  }

  // armo las tarjetas
  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    // le pongo ../ porque estoy en pages/
    const img = document.createElement("img");
    img.src = producto.img.startsWith("http") ? producto.img : `../${producto.img}`; 
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

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto";

    // borrar el item
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(dl);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  // calculo el total y lo limito a 2 decimales para evitar números largos
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  const totalFormateado = total.toFixed(2);

  // muestro el total
  const textoTotal = document.createElement("p");
  textoTotal.classList.add("total-carrito");
  textoTotal.textContent = `Total a pagar: $${totalFormateado}`;

  // boton de comprar
  const btnComprar = document.createElement("button");
  btnComprar.classList.add("btn", "bg-primary", "text-dark");
  btnComprar.textContent = "Comprar";
  
  btnComprar.addEventListener("click", () => {
    // importo vaciarCarrito de funcionesCarrito.js (ya importada arriba)
    vaciarCarrito();
    // importo mostrarMensaje de ui.js para avisar que compro (necesito importarla arriba)
    import("./ui.js").then(({ mostrarMensaje }) => {
      mostrarMensaje("¡Compra realizada con éxito! 🎉");
    });
    renderizarCarrito();
  });

  // boton de vaciar todo
  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  // meto todo al contenedor de acciones
  divAcciones.style.flexDirection = "column";
  divAcciones.style.alignItems = "center";
  divAcciones.style.gap = "2rem";

  const divBotones = document.createElement("div");
  divBotones.style.display = "flex";
  divBotones.style.gap = "1rem";
  divBotones.appendChild(btnComprar);
  divBotones.appendChild(btnVaciar);

  divAcciones.appendChild(textoTotal);
  divAcciones.appendChild(divBotones);
};

// inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
