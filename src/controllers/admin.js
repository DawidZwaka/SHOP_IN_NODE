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
const Settings = require("../models/settings");
const Fieldset = require("../util/fieldset");
const { addProductFields } = require("../util/constants/product");
const Slider = require("../models/slider");


/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

exports.getAddProduct = (req, res, next) => {
  const productFieldset = new Fieldset(addProductFields);
  res.render("admin/addProduct.pug", {
    editing: false,
    inputs: productFieldset.getFields(),
    pageTitle: "Add Product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    img: req.body.picture,
  });

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => next(err));
};

exports.getEditProduct = (req, res, next) => {
  const productID = req.params.productID;
  const productFieldset = new Fieldset(addProductFields);

  Product.findById(productID)
    .then((product) => {
      const { title: name, price, desc, img: picture } = product;
      productFieldset.setValues({ name, price, desc, picture });

      res.render("admin/addProduct.pug", {
        editing: true,
        inputs: productFieldset.getFields(),
        productID: product._id,
        pageTitle: "Edit Product",
      });
    })
    .catch((err) => next(err));
};

exports.postEditProduct = (req, res, next) => {
  const productID = req.query.id;

  Product.findById(productID)
    .then((product) => {
      product.title = req.body.name;
      product.price = req.body.price;
      product.desc = req.body.desc;
      product.img = req.body.picture;

      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => next(err));
};

exports.deleteProduct = (req, res, next) => {
  const productID = req.params.productID;

  Product.findByIdAndRemove(productID)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => next(err));
};

exports.getProductList = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products.pug", {
        prods: products,
        pageTitle: "Products",
      });
    })
    .catch((err) => next(err));
};

exports.getOrders = (req, res, next) => {
  Order.find()
    .sort({ date: -1 })
    .then((orders) =>
      res.render("admin/orders", {
        orders: orders,
        pageTitle: "Orders",
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

      res.render("admin/order", { order, referer});
    })
    .catch((err) => next(err));
};

exports.getMainPage = (req, res, next) => {
  Order.find()
    .limit(7)
    .sort({ date: -1 })
    .then((orders) => {
      res.render("admin/index", { orders, pageTitle: "Welcome on board!" });
    })
    .catch((err) => next(err));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("admin/users", { users, pageTitle: "Users" });
    })
    .catch((err) => next(err));
};

exports.getSettings = (req, res, next) => {
  const settings = Settings.getParsedSettings();

  res.render("admin/settings", { settings, pageTitle: "Shop Settings" });
};

exports.postEditSettings = (req, res, next) => {
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

exports.getAddUser = (req, res, next) => {
  res.render("admin/addUser", { pageTitle: "Add User" });
};

exports.getEditUser = (req, res, next) => {};

exports.postEditUser = (req, res, next) => {};

exports.getTranslation = (req, res, next) => {
  res.render("admin/translation", { pageTitle: "Translation" });
};

exports.postOrder = (req, res, next) => {
  const {
    params: { orderID },
    query: { status },
  } = req;

  Order.findById(orderID)
    .then((order) => {
      order.status = status;

      return order.save();
    })
    .then(() => {
      res.redirect(`/admin/orders/${orderID}`);
    })
    .catch((err) => next(err));
};

exports.getSlides = (req,res,next) => {

  
  Slider.findOne()
    .then( slider => {
      slider.sortSlides();
      res.render("admin/slides",{slider});
    })
    .catch(err => next(err));
}

exports.postEditSlideOrder = (req,res,next) => {
  const {id, order} = req.query;

  Slider.findOne()
    .then(slider => {

      switch(Number(order)){
        case 1: {
          return slider.incrementSlideOrder(id);
        }
        case -1: 
          return slider.decrementSlideOrder(id);
        default: return;
      }
    })
    .then(data => {
      res.redirect("/admin/slides");
    })
    .catch(err => next(err));
}

exports.getImages = (req,res,next) => {
  res.render("admin/images");
}