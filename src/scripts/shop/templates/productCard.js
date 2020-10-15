const productCard = (product, currency, sizing) => `
<div class="mb-3 ${sizing}">
    <div class="card shadow rounded-lg">
        <div class="card-img-top">
            <div class="image--square">
                <img src="${product.img}" alt="alt"/>
            </div>
        </div>
        <div class="card-body px-4 d-flex">
            <div class="p-1 mr-auto">
                <h5 class="font-weight-bold">
                    ${product.title}
                </h5>
                <p class="card-text">
                    ${
                      product.desc.length > 60
                        ? `${product.desc.slice(0, 59)} ...`
                        : product.desc
                    }
                </p>
            </div>
            <div class="d-flex flex-column justify-content-center">
                <a class="h5">
                    <i class="fas fa-shopping-basket"></i>
                </a>
                <a href="/product/${product._id}" class="h5 text-primary">
                    <i class="fas fa-location-arrow rotate-45"></i>
                </a>
            </div>
            <div class="card-label">
                <h6 class="m-0">
                    ${product.price} ${currency}
                </h6>
            </div>
        </div>
    </div>
</div>
    `;
