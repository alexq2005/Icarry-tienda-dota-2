const KEY = "carrito";

// guardo el carrito en la compu
export const guardarCarrito = (carrito) => {
  localStorage.setItem(KEY, JSON.stringify(carrito));
};

// traigo el carrito o devuelvo vacio
export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

// borro el carrito de la compu
export const vaciarCarritoStorage = () => {
  localStorage.removeItem(KEY);
};
