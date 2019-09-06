const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add_product.pug');
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.product_name);

    product.save();
    res.redirect('/');
}

exports.getShopPage = (req, res, next) => {

    const products = Product.fetchAll();

    res.render('shop.pug', {prods: products});
}