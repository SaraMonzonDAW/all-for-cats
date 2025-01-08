document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.getElementById("carouselInner");

    const jsonUrl = "../products.json"; 
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let htmlContent = "";

            const productGroups = [];
            for (let i = 0; i < data.productosDestacados.length; i += 3) {
                productGroups.push(data.productosDestacados.slice(i, i + 3));
            }

            productGroups.forEach((group, index) => {
                const isActive = index === 0 ? "active" : ""; 
                htmlContent += `
                    <div class="carousel-item ${isActive}" data-bs-interval="10000">
                        <div class="d-flex justify-content-center">
                            ${group
                                .map(
                                    (producto) => `
                                <div class="card mx-2 custom-card-height">
                                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                                    <div class="card-body custom-card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <p class="card-text"><small class="text-muted"><del>$${producto.precioOriginal.toFixed(2)}</del></small></p>
                                        <p class="card-text"><strong>$${producto.precioOferta.toFixed(2)}</strong></p>
                                    </div>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `;
            });

            carouselInner.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error.message);
        });
});
