document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.querySelector(".carousel-inner");
    const jsonUrl = "../products.json";

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(data => {
            const productos = data.productosDestacados;
            const isMobile = window.innerWidth <= 768; 
            let htmlContent = "";

            if (isMobile) {
                productos.forEach((producto, index) => {
                    const isActive = index === 0 ? "active" : "";
                    htmlContent += `
                        <div class="carousel-item ${isActive}">
                            <div class="d-flex justify-content-center">
                                <div class="card mx-2 custom-card-height">
                                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                                    <div class="card-body custom-card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <p class="card-text"><small class="text-muted"><del>$${producto.precioOriginal.toFixed(2)}</del></small></p>
                                        <p class="card-text"><strong>$${producto.precioOferta.toFixed(2)}</strong></p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    `;
                });
            } else {
                for (let i = 0; i < productos.length; i += 3) {
                    const isActive = i === 0 ? "active" : "";
                    const tarjeta1 = productos[i];
                    const tarjeta2 = productos[i + 1];
                    const tarjeta3 = productos[i + 2];

                    htmlContent += `
                        <div class="carousel-item ${isActive}">
                            <div class="d-flex justify-content-center">
                                ${tarjeta1 ? generateCardHTML(tarjeta1) : ""}
                                ${tarjeta2 ? generateCardHTML(tarjeta2) : ""}
                                ${tarjeta3 ? generateCardHTML(tarjeta3) : ""}
                            </div>
                        <button>eo</button>
                        </div>
                    `;
                }
            }

            carouselInner.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });

    function generateCardHTML(producto) {
        return `
            <div class="card mx-2 custom-card-height">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body custom-card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><small class="text-muted"><del>$${producto.precioOriginal.toFixed(2)}</del></small></p>
                    <p class="card-text"><strong>$${producto.precioOferta.toFixed(2)}</strong></p>
                </div>
            </div>
        `;
    }
});

const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });