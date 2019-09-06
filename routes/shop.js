const express = require('express');
const router = express.Router();
const { getShopPage } = require('../controllers/products');

router.get('/', getShopPage);

module.exports = router;