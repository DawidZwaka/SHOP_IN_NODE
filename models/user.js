/*
██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
███╗   ███╗ ██████╗ ██████╗ ███████╗██╗     
████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║     
██╔████╔██║██║   ██║██║  ██║█████╗  ██║     
██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║     
██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
*/ 

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    passwdResToken: String,
    passwdResTokenExp: Date,
    cart: {
        products: [
            {
            productID: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
                }, 
            qty: {
                type: Number,
                required: true
                }
            }
        ],
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProducts = this.cart.products,
            updatedCart = {products: [] };


        if( cartProducts.length === 0 ) {

            updatedCart.products.push({
                    productID: product._id,
                    qty: 1
                });

        } else if( cartProducts.find( cartProd => String(cartProd.productID) === String(product._id)) ) {
            const prodIndex = cartProducts.findIndex( cartProd => String(cartProd.productID) === String(product._id) );
            updatedCart.products = [...cartProducts];
            updatedCart.products[prodIndex].qty++;

        } else {
            updatedCart.products = [...cartProducts, {productID: product._id, qty: 1}];
        }
        
        this.cart = updatedCart;
        return this.save();
}

userSchema.methods.getCart = function () {
     
    return this.populate({
        path: 'cart.products.productID',
    })
    .execPopulate()
    .then( user => {

        return user.cart.products
            .filter( product => product.productID !== null)
            .map( product => ({...product.productID._doc, qty: product.qty}) ) 
    })
    .then( products => {
        let total;

        if (products.length === 0 ) total = 0;
        else if (products.length === 1) total = products[0].qty * products[0].price;
        else total = products.reduce( (prev, next) => (prev.qty*prev.price) + (next.qty*next.price) );
        
        return {
            products: products,
            totalPrice: total
        }
    })
}

userSchema.methods.removeFromCart = function(productID) {
    const updatedCartProducts = this.cart.products.filter(product =>
        String(product.productID) !== String(productID) );

    this.cart.products = updatedCartProducts;

    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart.products = [];

    return this.save();
}

/*
███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
█████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/  

module.exports = mongoose.model('User', userSchema);