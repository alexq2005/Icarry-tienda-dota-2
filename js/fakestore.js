import { agregarAlCarrito } from "./funcionesCarrito.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos-fakestore");
  if (!contenedor) return;

  const titulo = document.createElement("h2");
  titulo.textContent = "FAKESTORE API";
  titulo.classList.add("titulo-productos");
  titulo.style.width = "100%";
  contenedor.appendChild(titulo);

  // llamo a fakestore (vestimenta)
  fetch("https://fakestoreapi.com/products/category/men's clothing?limit=4")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((prod) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const tituloCard = document.createElement("h3");
        tituloCard.textContent = prod.title;

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${prod.price}`;

        const imagen = document.createElement("img");
        imagen.src = prod.image;
        imagen.alt = prod.title;
        
        // pinto de blanco el fondo de las imagenes
        imagen.style.backgroundColor = "#fff";
        imagen.style.objectFit = "contain";
        imagen.style.padding = "10px";

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-primary", "text-dark");
        boton.textContent = "Agregar al carrito";

        // defino los datos a guardar
        const productoParaCarrito = {
          id: `fake-${prod.id}`,
          nombre: prod.title,
          precio: prod.price,
          img: prod.image,
          detalles: { "Categoría": prod.category }
        };

        boton.addEventListener("click", () => {
          agregarAlCarrito(productoParaCarrito);
        });

        tarjeta.append(imagen, tituloCard, precio, boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log("error api fakestore:", error));
});
