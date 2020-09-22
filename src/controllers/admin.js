/*
██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const order = require("../models/order");
const { notFound } = require("../util/errors");
const Settings = require("../util/settings");
class Fieldset {
  #fields = {};

  setValues = (values) => {
    for (const key in values) {
      const val = values[key];
      if (this.#fields[key] !== undefined) this.#fields[key].value = val;
    }
  };

  getFields = () => {
    const fieldset = JSON.parse(JSON.stringify(this.#fields));

    return Object.entries(fieldset).map(([key, val]) => ({
      name: key,
      ...val,
    }));
  };

  constructor(obj) {
    this.#fields = obj;
  }
}
const productFields = {
  name: {
    label: "Name",
    type: "text",
  },
  picture: {
    label: "Picture of product",
    type: "image",
  },
  price: {
    label: "Price",
    type: "number",
  },
  desc: {
    label: "Description",
    type: "textarea",
  },
};

const productFieldset = new Fieldset(productFields);

/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

exports.getAddProduct = (req, res, next) => {
  res.render("admin/addProduct.pug", {
    editing: false,
    inputs: productFieldset.getFields(),
  });
};

exports.postAddProduct = (req, res, next) => {
  if (!req.file) {
    return res.status(422).render("admin/addProduct.pug", {
      errors: ["Invalid file type"],
    });
  }

  const product = new Product({
    title: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    img: "/" + req.file.path,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => next(err));
};

exports.getEditProduct = (req, res, next) => {
  const productID = req.params.productID;

  Product.findById(productID)
    .then((product) => {
      const { title: name, price, desc, img } = product;
      productFieldset.setValues({ name, price, desc, img });

      console.log(productFieldset.getFields());
      res.render("admin/addProduct.pug", {
        editing: true,
        inputs: productFieldset.getFields(),
        productID: product._id,
      });
    })
    .catch((err) => next(err));
};

exports.postEditProduct = (req, res, next) => {
  const productID = req.query.id;
  let image = req.body.oldImage;

  if (req.file) {
    image = "/" + req.file.path;
  }

  Product.findById(productID)
    .then((product) => {
      product.title = req.body.name;
      product.price = req.body.price;
      product.desc = req.body.desc;
      product.img = image;

      return product.save();
    })
    .then((result) => res.redirect("/admin/products"))
    .catch((err) => next(err));
};

exports.deleteProduct = (req, res, next) => {
  const productID = req.params.productID;

  Product.findByIdAndRemove(productID)
    .then((result) => {
      Product.find()
        .then((products) => {
          res.render("admin/products.pug", {
            prods: products,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.getProductList = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products.pug", {
        prods: products,
      });
    })
    .catch((err) => next(err));
};

exports.getOrders = (req, res, next) => {
  Order.find()
    .then((orders) =>
      res.render("admin/orders", {
        orders: orders,
      })
    )
    .catch((err) => next(err));
};

exports.getOrder = (req, res, next) => {
  const { orderID } = req.params;
  const { referer } = req.headers;

  Order.findById(orderID)
    .then((order) => {
      if (!order) throw notFound;

      res.render("admin/order", { order, referer });
    })
    .catch((err) => next(err));
};

exports.getMainPage = (req, res, next) => {
  Order.find()
    .limit(7)
    .then((orders) => {
      res.render("admin/index", { orders });
    })
    .catch((err) => next(err));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("admin/users", { users });
    })
    .catch((err) => next(err));
};

exports.getSettings = (req, res, next) => {
  const settings = Settings.getParsedSettings();

  res.render("admin/settings", { settings });
};

exports.editSettings = (req, res, next) => {
  const inputs = { ...req.body };

  delete inputs._csrf;

  Object.entries(inputs).forEach(([key, val]) => {
    Settings.setSetting(key, val);
  });

  Settings.updateSettings()
    .then((msg) => {
      res.redirect("/admin/settings");
    })
    .catch((err) => next(err));
};
