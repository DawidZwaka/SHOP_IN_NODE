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
    postEditSettings,
    getAddUser,
    getEditUser,
    postEditUser,
    getTranslation,
    postOrder,
    getSlides,
    postEditSlideOrder,
    getImages
  } = require("../controllers/admin"),
  { body } = require("express-validator"),
  { resolveProductValidation } = require("../middleware/resolveFormValidation");

const productPostValidation = [
  body("name").isAlphanumeric().isLength({ max: 400 }),
  body("price").isFloat().trim(),
  body("desc").isLength({ max: 3000 }).trim(),
  resolveProductValidation,
];

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

router.post("/edit-product", productPostValidation, postEditProduct);

router.get("/add-product", getAddProduct);

router.post("/add-product", productPostValidation, postAddProduct);

router.get("/products", getProductList);

router.get("/orders", getOrders);

router.get("/orders/:orderID", getOrder);

router.post("/orders/:orderID", postOrder);

router.get("/users", getUsers);

router.post("edit-user", postEditUser);

router.get("/add-user", getAddUser);

router.get("/edit-user", getEditUser);

router.get("/translation", getTranslation);

router.get("/settings", getSettings);

router.post("/edit-settings", postEditSettings);

router.get("/", getMainPage);

router.get("/slides", getSlides);

router.post("/edit-slider/slides", postEditSlideOrder)

router.get("/images", getImages);

/*
███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
█████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

module.exports = router;
