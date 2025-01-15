document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelector(".main__catalog-list");
  const resultsInfo = document.querySelector(".main__catalog-results");
  const paginationControls = document.querySelector(".main__catalog-controls");

  const itemsPerPage = 9;
  let currentPage = 1;
  let products = [];

  const cartCountElement = document.querySelector(".header__cart-count");
  let cartItems = [];

  fetch("./products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      return response.json();
    })
    .then((data) => {
      products = data.allProducts;
      renderPage();
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      listItems.innerHTML = `<p>Error al cargar los productos.</p>`;
    });

  function renderPage() {
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const visibleItems = products.slice(startIndex, endIndex);

    let contentList = `<ul class="main__catalog-listgrid">`;
    visibleItems.forEach((producto) => {
      contentList += `
        <li class="list__card">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="list__card-img">
          <p class="list__card-name">${producto.nombre}</p>
          <p class="list__card-price">${producto.precioOriginal}€</p>
          <div class="list__card-actions">
            <div class="list__card-counter">
              <button class="list_card-counterMinus">-</button>
              <span class="list_card-counterText">0</span>
              <button class="list_card-counterPlus">+</button>
            </div>
            <button class="list__card-add" data-id="${producto.id}">Añadir</button>
          </div>
        </li>`;
    });
    contentList += `</ul>`;
    listItems.innerHTML = contentList;

    resultsInfo.textContent = `Mostrando resultados ${startIndex + 1}-${endIndex} de ${totalItems}`;
    renderPaginationControls(totalPages);
    attachCardEventListeners();
  }

  function renderPaginationControls(totalPages) {
    paginationControls.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.className = "pagination-prev";
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.disabled = currentPage === totalPages;
    nextButton.className = "pagination-next";
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
        window.scrollTo({ top: 500, behavior: "smooth" });
      }
    });

    paginationControls.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = `pagination-button ${i === currentPage ? "active" : ""}`;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderPage();
        window.scrollTo({ top: 500, behavior: "smooth" });
      });
      paginationControls.appendChild(pageButton);
    }

    paginationControls.appendChild(nextButton);
  }

  function attachCardEventListeners() {
    const minusButtons = document.querySelectorAll(".list_card-counterMinus");
    const plusButtons = document.querySelectorAll(".list_card-counterPlus");
    const addButtons = document.querySelectorAll(".list__card-add");

    minusButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const counter = e.target.parentElement.querySelector(".list_card-counterText");
        let count = parseInt(counter.textContent, 10);
        if (count > 0) {
          count--;
          counter.textContent = count;
        }
      });
    });

    plusButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const counter = e.target.parentElement.querySelector(".list_card-counterText");
        let count = parseInt(counter.textContent, 10);
        count++;
        counter.textContent = count;
      });
    });

    addButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        const counter = e.target.parentElement.querySelector(".list_card-counterText");
        const quantity = parseInt(counter.textContent, 10);

        if (quantity > 0) {
          addToCart(productId, quantity);
          counter.textContent = 0;
        }
      });
    });
  }

  function addToCart(productId, quantity) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ id: productId, quantity });
    }
    updateCartCount();
  }

  function updateCartCount() {
    const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItemsInCart;
  }
});
