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
const mongodb = require('mongodb');

/*
constans
*/

const PRODUCTS_PER_PAGE = 2;

/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
*/                                                                                             

exports.getIndexPage = (req, res, next) => {

    res.render('shop/index.pug', {
            pageTitle: 'Shop in node'
    });
}

exports.getShopPage = (req, res, next) => {
    const page = req.query.page;
    let amountOfProducts;

    Product.countDocuments()
        .then( count => {
            amountOfProducts = count;

            return Product.find()
                .skip( (page-1)*PRODUCTS_PER_PAGE )
                .limit(PRODUCTS_PER_PAGE)
                .then( products => {
                    
                    res.render('shop/shop.pug', 
                    {
                        products: products,
                        pageTitle: 'Shop page',
                        amountOfPages: Math.ceil(amountOfProducts/PRODUCTS_PER_PAGE),
                        currentPage: Number(page),
                    });
                })

        })
        .catch( err => res.redirect('/500') );

}

exports.getProductPage = (req, res, next) => {
    const ID = req.params.productID;

    Product.findById(ID)
        .then( product => {

            res.render('shop/product.pug', {
                pageTitle: 'Product page',
                prod: product
            });
        })
        .catch( err => res.redirect('/500') );
}

exports.getCheckoutPage = (req, res, next) => {
    const User = req.user;

    User.getCart()
        .then( cart => {
            if(cart.products.length !== 0) {

                res.render('shop/checkout.pug', {
                    pageTitle: 'Checkout page',
                    cart: cart
                });
            } else {
                return res.redirect('/cart');
            }
        })
        .catch( err => res.redirect('/500') );
}

exports.getCartPage = (req, res, next) => {
    const User = req.user;

    User.getCart()
        .then( cart => {

            res.render('shop/cart.pug', {
                cart: cart
                })
        })
        .catch( err => res.redirect('/500') );

}

exports.postCart = (req, res, next) => {
    const productID = req.body.product_id;
    const User = req.user;

    Product.findById(productID)
        .then( product => User.addToCart(product) )
        .then( cart => res.redirect('/cart'))
        .catch( err => res.redirect('/500') );
}

exports.postRemoveFromCart = (req, res, next) => {
    const productID = req.params.productID;
    const User = req.user;
    
    User.removeFromCart(productID)
        .then( result => res.redirect('/cart'))
        .catch( err => res.redirect('/500') );
}

exports.postOrder = (req, res, next) => {
    const User = req.user;
    let orderID;
    
    User.getCart()
        .then( cart => {

            const newOrder = new Order({
                cart: cart,
                user: {
                    email: User.email,
                    _id: new mongodb.ObjectId( User._id ),
                    name: User.name
                }
            });

            return newOrder.save();
        })
        .then( result => {
            orderID = result._id;

            return User.clearCart();
        })
        .then( result => res.redirect(`/order/${orderID}`))
        .catch( err => res.redirect('/500') );
}

exports.getOrderPage = (req, res, next) => {
    const orderID = req.params.orderID;

    Order.findById(orderID)
        .then( order => {
            
            res.render('shop/order.pug', {
                pageTitle: 'Order Page',
                order: order
            });
        })
        .catch( err => res.redirect('/500') )
}