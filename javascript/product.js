document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelector(".main__catalog-list");

  fetch("../products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      return response.json();
    })
    .then((data) => {
      const products = data.allProducts;
      const isMobile = window.innerWidth <= 768;
      let contentList = "";

      if (isMobile) {
        products.forEach((producto) => {
          contentList += `
                        <button>${producto.nombre}</button>
                    `;
        });
      } else {
        contentList += `<ul class="main__catalog-listgrid">`;
        products.forEach((producto) => {
          contentList += `
                        <li class="list__card">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="list__card-img">
                            <p>${producto.nombre}</p>
                            <p>${producto.precioOriginal}€</p>
                            <div class="list__card-counter">
                                <button class="list_card-counterMinus"><svg width="65px" height="65px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                                <span class="list_card-counterText">0</span>
                                <button class="list_card-counterPlus"><svg width="65px" height="65px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                            </div>
                            <button>Añadir</button>
                        </li>
                    `;
        });
        contentList += `</ul>`;
      }

      listItems.innerHTML = contentList;
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      listItems.innerHTML = `<p>Error al cargar los productos.</p>`;
    });
});
