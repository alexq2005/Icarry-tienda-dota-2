import { agregarAlCarrito } from "./funcionesCarrito.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos-dummy");
  if (!contenedor) return;

  const titulo = document.createElement("h2");
  titulo.textContent = "DummyJson API";
  titulo.classList.add("titulo-productos");
  titulo.style.width = "100%";
  contenedor.appendChild(titulo);

  // categorias de dummyjson (tecnologia)
  let categoria = "smartphones";

  let urlCategoria = `https://dummyjson.com/products/category/${categoria}?limit=4`;

  if (categoria) {
    const tituloCategoria = document.createElement("h3");
    tituloCategoria.textContent = `Categoria: ${categoria}`;
    tituloCategoria.style.width = "100%";
    tituloCategoria.style.textAlign = "center";
    tituloCategoria.style.color = "#8a79a8";
    tituloCategoria.style.marginBottom = "2rem";
    contenedor.appendChild(tituloCategoria);
  }

  // hago el fetch de los productos
  fetch(urlCategoria)
    .then((response) => response.json())
    .then((data) => {
      data.products.forEach((prod) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const tituloCard = document.createElement("h3");
        tituloCard.textContent = prod.title;

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${prod.price}`;

        const imagen = document.createElement("img");
        imagen.src = prod.images[0] || prod.thumbnail;
        imagen.alt = prod.title;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-primary", "text-dark");
        boton.textContent = "Agregar al carrito";

        // preparo el producto para guardar
        const productoParaCarrito = {
          id: `dummy-${prod.id}`,
          nombre: prod.title,
          precio: prod.price,
          img: prod.images[0] || prod.thumbnail,
          detalles: { "Categoría": prod.category }
        };

        boton.addEventListener("click", () => {
          agregarAlCarrito(productoParaCarrito);
        });

        tarjeta.append(imagen, tituloCard, precio, boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log("error api dummyjson:", error));
});
