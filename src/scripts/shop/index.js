//const urlBase = "http://localhost:8000";

const shopTabsSelector = "#shopProductsList",
  mainPageLastProdsSelector = "#productsList",
  mainPageLastProds = $(mainPageLastProdsSelector),
  shopTabs = $(shopTabsSelector),
  endpoint = "/api/products";

if (mainPageLastProds.length) {
  const mainPageLastProducts = new ProductsCards({
    loader: `${mainPageLastProdsSelector}`,
    content: `${mainPageLastProdsSelector} #tab_1 .row`,
  });
}

if (shopTabs.length) {
  const productsPerPage = shopTabs.find("#tabs").data("productsperpage");

  const shopProducts = new ProductsCards(
    {
      loader: `${shopTabsSelector}`,
      content: `${shopTabsSelector} #tab_1 .row`,
    },
    { pageSize: productsPerPage }
  );

  $(`${shopTabsSelector} a[data-toggle='pill']`).on("show.bs.tab", (ev) => {
    const paginationLink = ev.target;
    const contentSelector = $(paginationLink).attr("href");
    const page = Number(contentSelector.slice(-1));

    shopProducts.setPage(page);
    shopProducts.setSelector(
      "content",
      `${shopTabsSelector} ${contentSelector} .row`
    );
    shopProducts.create();
  });
}

//qty selector
const cartProducts = ".cart__products ul";

$(cartProducts)
  .find("li")
  .each((key, elem) => {
    const elemId = $(elem).attr("id"),
      qtySelectors = {
        incrementor: `#${elemId} .incQty`,
        decrementor: `#${elemId} .decQty`,
        counter: `#${elemId} .qtyCounter`,
      };

    const qtySelector = new CartQtySelector(qtySelectors);
  });
