/*
██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
*/                                                                                             

exports.getAddProduct = (req, res, next) => {
    res.render('admin/addProduct.pug', {
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {

    if(!req.file) {
        return res.status(422).render('/admin/add-product',
            {
                errors: ['Invalid file type']
            });
    }

    const product = new Product({
        title: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        img: '/'+req.file.path
    });

    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => res.redirect('/500') );
}

exports.getEditProduct = (req, res, next) => {
    const productID = req.params.productID;

    Product.findById(productID)
        .then(product => {

            res.render('admin/addProduct.pug', {
                editing: true,
                product,
            });
        })
        .catch(err => res.redirect('/500') );
}

exports.postEditProduct = (req, res, next) => {
    const productID = req.query.id;
    let image = req.body.oldImage

    if(req.file) {
        image = '/'+req.file.path;
    }

    Product.findById(productID)
        .then( product => {
            product.title = req.body.name;
            product.price = req.body.price;
            product.desc = req.body.desc;
            product.img = image

            return product.save();
        })
        .then(result => res.redirect('/admin/products'))
        .catch( err => res.redirect('/500') );
}

exports.deleteProduct = (req, res, next) => {
    const productID = req.params.productID;

    Product.findByIdAndRemove(productID)
        .then( result => {
            res.status(200).json({
                message: 'Success!'
            });
        })
        .catch( err => res.status(500).json({
            message: 'Deleting product failed!'
        }) );
}

exports.getProductList = (req, res, next) => {

    Product.find()
        .then( products => {
            res.render('admin/productList.pug', {
                prods: products
            });
        })
        .catch( err => res.redirect('/500') );
}

exports.getOrders = (req, res, next) => {
    Order.find()
        .then( orders => res.render('admin/orders', {
            orders: orders
        }))
        .catch( err => res.redirect('/500') );
}
