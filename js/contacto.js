import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// pongo la cantidad de items en el carrito cuando carga contacto
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
});
