import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

// agrego al carrito y guardo
export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  carrito.push(producto);

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado 🎉");
};

// borro un item y guardo
export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  carrito.splice(indice, 1);

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado ✅");
};

// vacio todo el carrito
export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado");
};
