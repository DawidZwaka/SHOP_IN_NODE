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
  getAddProduct,
  postAddProduct,
  getProductList,
  getEditProduct,
  postEditProduct,
  deleteProduct,
  getOrders,
  getOrder,
  getMainPage,
  getUsers,
  getSettings,
  editSettings,
} = require("../controllers/admin");

/*
██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
*/

router.post("/delete-product/:productID", deleteProduct);

router.get("/edit-product/:productID", getEditProduct);

router.post("/edit-product", postEditProduct);

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/products", getProductList);

router.get("/orders", getOrders);

router.get("/orders/:orderID", getOrder);

router.get("/users", getUsers);

router.get("/settings", getSettings);

router.post("/edit-settings", editSettings);

router.get("/", getMainPage);

/*
███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
█████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

module.exports = router;
