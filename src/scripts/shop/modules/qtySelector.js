class QtySelector {
  #qty;
  selectors = {
    incrementor: "",
    decrementor: "",
    counter: "",
  };

  #init = () => {
    const { incrementor: inc, decrementor: dec, counter } = this.selectors;

    for (const key in this.selectors)
      if (!$(this.selectors[key]).length) return;

    $(inc).on("click", this.increment);
    $(dec).on("click", this.decrement);
    $(counter).on("input", this.getQty);
    $(document).on("DOMContentLoaded", this.getQty);
  };

  updateQty = (qty) => {
    $(this.selectors.counter).val(qty);
  };

  getQty = (ev) => {
    const qty = $(this.selectors.counter).val();

    this.#qty = Number(qty);
  };

  increment = () => {
    this.#qty++;
    this.updateQty(this.#qty);
  };

  decrement = () => {
    if (this.#qty <= 1) return;

    this.#qty--;
    this.updateQty(this.#qty);
  };

  setQty = (qty) => {
    this.#qty = Number(qty);
  };

  constructor(selectors) {
    this.selectors = selectors;

    this.#init();
  }
}

class CartQtySelector extends QtySelector {
  #init = () => {
    const { incrementor: inc, decrementor: dec } = this.selectors;

    $(inc).on("click", this.updateCart);
    $(dec).on("click", this.updateCart);
  };
  sendSetQtyReq = () => {
    fetch();
  };

  updateCart = () => {
    console.log("wwww");
  };
  constructor(props) {
    super(props);
    //console.log(this.selectors);
    //this.#init();
  }
}
