const Cart = require("../models/cart");
const Products = require("../models/product");

exports.getProducts = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("shop/products", {prods: products, pageTitle: "My Shop", path: "/"});
    })
}

exports.getCarts = (req, res, next)=>{
    Cart.fetchCart(cart =>{
        Products.fetchAll((products)=>{
            let productCart = [];
            for(let product of products){
                const cartsMatchedInProducts = cart.products.find(prod => prod.id === product.id);
                const cartsMatchedInProductsIndex = cart.products.findIndex(prod => prod.id === product.id)                 
                if(cartsMatchedInProducts){
                    productCart.push({prod: product, index: cartsMatchedInProductsIndex + 1, qty: cartsMatchedInProducts.qty})
                }
            }
            res.render("shop/cart", {prods: productCart, totalPrice: cart.totalPrice, path: "/cart", pageTitle: "Shopping Cart"} )
    
        })

    })

};

exports.getProductDetails = (req, res, next)=>{
    const prodId = req.params.productId
    Products.fetchProductDetails(prodId, (products)=>{
        res.render("shop/product-details", {prods: products, path: "/product-details"} )
    })
}

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId;
    Products.fetchProductDetails(prodId, (product)=>{
        Cart.productCart(prodId, product.price)
    })
    res.redirect(`${req.url === "/add-to-cart" ? `/products/${prodId}` : "/"}`)
}
exports.removeCart = (req, res, next)=>{
    const prodId = req.params.productId
    Products.fetchProductDetails(prodId, (product) =>{
        Cart.removeCart(prodId, product.price)
        res.redirect("/cart")
    })
    console.log(prodId)
}