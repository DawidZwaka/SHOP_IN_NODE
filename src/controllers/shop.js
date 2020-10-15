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
const mongodb = require("mongodb");
const Settings = require("../util/settings");
/*
constans
*/

const PRODUCTS_PER_PAGE = 20;

/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

exports.getIndexPage = (req, res, next) => {
  res.render("shop/index.pug", {
    pageTitle: "Shop in node",
  });
};

exports.getShopPage = (req, res, next) => {
  Product.countDocuments()
    .then((productsCount) => {
      res.render("shop/shop.pug", {
        pageTitle: "Shop page",
        pages: Math.ceil(productsCount / PRODUCTS_PER_PAGE),
        productsPerPage: PRODUCTS_PER_PAGE,
      });
    })
    .catch((err) => next(err));
};

exports.getProductPage = (req, res, next) => {
  const ID = req.params.productID;

  Product.findById(ID)
    .then((product) => {
      res.render("shop/product.pug", {
        pageTitle: "Product page",
        prod: product,
      });
    })
    .catch((err) => res.redirect("/500"));
};

exports.getCheckoutPage = (req, res, next) => {
  const User = req.user;

  User.getCart()
    .then((cart) => {
      if (cart.products.length !== 0) {
        res.render("shop/checkout.pug", {
          pageTitle: "Checkout page",
          cart: cart,
        });
      } else {
        return res.redirect("/cart");
      }
    })
    .catch((err) => res.redirect("/500"));
};

exports.getCartPage = (req, res, next) => {
  const User = req.user;
  const { referer } = req.headers;

  User.getCart()
    .then((cart) => {
      res.render("shop/cart.pug", {
        cart,
        referer,
      });
    })
    .catch((err) => res.redirect("/500"));
};

exports.postCart = (req, res, next) => {
  const productID = req.body.product_id;
  const User = req.user;

  Product.findById(productID)
    .then((product) => User.addToCart(product))
    .then((cart) => res.redirect("/cart"))
    .catch((err) => res.redirect("/500"));
};

exports.postRemoveFromCart = (req, res, next) => {
  const productID = req.params.productID;
  const User = req.user;

  User.removeFromCart(productID)
    .then((result) => res.redirect("/cart"))
    .catch((err) => res.redirect("/500"));
};

exports.postOrder = (req, res, next) => {
  const User = req.user,
    status = "in progress",
    date = new Date();
  let orderID;

  User.getCart()
    .then((cart) => {
      const newOrder = new Order({
        cart: cart,
        user: {
          email: User.email,
          _id: new mongodb.ObjectId(User._id),
          name: User.name,
        },
        status,
        date,
      });

      return newOrder.save();
    })
    .then((result) => {
      orderID = result._id;

      return User.clearCart();
    })
    .then((result) => res.redirect(`/order/${orderID}`))
    .catch((err) => res.redirect("/500"));
};

exports.getOrderPage = (req, res, next) => {
  const orderID = req.params.orderID;

  Order.findById(orderID)
    .then((order) => {
      res.render("shop/order.pug", {
        pageTitle: "Order Page",
        order,
      });
    })
    .catch((err) => res.redirect("/500"));
};

//REST endpoints
exports.getShopSetting = (req, res, next) => {
  const id = req.params.settingID;
  const setting = Settings.getSettingVal(id);

  res.status(200).json({ [id]: setting });
};

exports.getProducts = (req, res, next) => {
  let { amount, offset } = req.query;

  if (!amount) amount = 10;
  if (!offset) offset = 0;

  Product.find()
    .skip(Number(offset))
    .limit(Number(amount))
    .then((products) => {
      res.status(200).json(products);
    });
};

exports.postCartProductQty = (req, res, next) => {};
