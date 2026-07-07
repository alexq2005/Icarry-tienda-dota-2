// cambio el numero del carrito
export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
};

// muestro un cartel de aviso en vez de usar alert()
export const mostrarMensaje = (texto) => {
  // busco el contenedor
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  // creo el cartel
  const toast = document.createElement("div");
  toast.classList.add("hud-toast");
  
  // le pongo un icono
  const icon = document.createElement("span");
  icon.classList.add("hud-toast-icon");
  icon.textContent = "⚠";
  
  // le pongo el texto
  const textNode = document.createElement("span");
  textNode.classList.add("hud-text");
  textNode.textContent = texto;

  toast.appendChild(icon);
  toast.appendChild(textNode);
  container.appendChild(toast);

  // lo animo para que aparezca
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // lo borro a los 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3000);
};
