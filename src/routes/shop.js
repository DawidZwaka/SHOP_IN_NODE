/*
██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

const express = require("express");
const router = express.Router();
const {
    getShopPage,
    getIndexPage,
    getCheckoutPage,
    getProductPage,
    getCartPage,
    postCart,
    postRemoveFromCart,
    postOrder,
    getOrderPage,
    getProducts,
    getShopSetting,
  } = require("../controllers/shop"),
  { param } = require("express-validator"),
  resolveRESTValid = require("../middleware/resolveRESTValidation");

const allowedSettings = ["currency"];

//helpers

const checkIfSettingAllowed = (value, { req }) => {
  let res = false;

  allowedSettings.forEach((setting) => {
    if (setting === value) res = true;
  });

  return res;
};

/*
██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
*/

router.get("/", getIndexPage);

router.get("/shop", getShopPage);

router.get("/product/:productID", getProductPage);

router.get("/cart", getCartPage);

router.post("/cart/delete/:productID", postRemoveFromCart);

router.post("/cart", postCart);

router.get("/checkout", getCheckoutPage);

router.post("/order", postOrder);

router.get("/order/:orderID", getOrderPage);

//REST

router.get("/api/products", getProducts);

router.get(
  "/api/settings/:settingID",
  [
    param("settingID")
      .custom(checkIfSettingAllowed)
      .withMessage("This setting is not allowed to read or doesn't exist!"),
  ],
  resolveRESTValid,
  getShopSetting
);

/*
███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
█████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

module.exports = router;
