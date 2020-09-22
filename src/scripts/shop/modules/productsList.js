class Loader {
  #loader;

  #init = () => {
    document.addEventListener("DOMContentLoaded", this.enableLoading);
  };

  disableLoading = () => this.#loader.classList.remove("loader--loading");

  enableLoading = () => this.#loader.classList.add("loader--loading");

  constructor(loaderSelector) {
    this.#loader = document.querySelector(loaderSelector);
    this.#init();
  }
}

class ProductsCards extends Loader {
  #settings = { page: 1, pageSize: 10 };
  #endpoints = {
    products: "/api/products",
    currency: "/api/settings/currency",
  };
  #selectors = {
    content: "",
    loader: "",
  };

  #init = () => {
    document.addEventListener("DOMContentLoaded", this.create);
  };

  #calcOffset = () => {
    const { page, pageSize } = this.#settings;

    return (page - 1) * pageSize;
  };

  #createUrlWithQuery = (url) =>
    url +
    "?" +
    new URLSearchParams({
      offset: this.#calcOffset(),
      amount: this.#settings.pageSize,
    });

  #fetchData = () => {
    const { currency, products } = this.#endpoints,
      data = {};

    return fetch(this.#createUrlWithQuery(products))
      .then((res) => res.json())
      .then((res) => (data.products = res))
      .then(() => fetch(currency))
      .then((res) => res.json())
      .then((res) => (data.currency = res.currency))
      .then(() => data);
  };

  #checkIfContainerEmpty = () =>
    $(this.#selectors.content).children().length === 0;

  create = () => {
    if (!this.#checkIfContainerEmpty()) return;

    this.enableLoading();

    this.#fetchData().then(({ products, currency }) => {
      const target = document.querySelector(this.#selectors.content);

      this.disableLoading();

      products.forEach((product) => {
        target.insertAdjacentHTML(
          "beforeend",
          productCard(product, currency, "col-12 col-sm-6 col-md-4 col-lg-3")
        );
      });
    });
  };

  setPage(page) {
    if (typeof page === "number") this.#settings.page = page;
    else throw new Error("Invalid property type!");
  }
  setSelector(key, val) {
    if (this.#selectors[key]) this.#selectors[key] = val;
  }

  constructor(selectors, settings) {
    super(selectors.loader);
    if (!endpoint || !selectors)
      console.log("Constructor properties undefinded!");

    for (const key in settings) this.#settings[key] = settings[key];
    for (const key in selectors) this.#selectors[key] = selectors[key];

    this.#init();
  }
}
