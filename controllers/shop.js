const Cart = require("../models/cart");
const Products = require("../models/product");

exports.getProducts = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("shop/products", {prods: products, pageTitle: "My Shop", path: "/"});
    })
}

exports.getCarts = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("shop/cart", {prods: products, path: "/cart", pageTitle: "Shopping Cart"} )
    })
};

exports.getProductDetails = (req, res, next)=>{
    const prodId = req.params.productId
    Products.fetchProductDetails(prodId, (products)=>{
        res.render("shop/product-details", {prods: products, path: "/product-details", pageTitle: `${products.name} - product details`} )
    })
}

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId;
    Products.fetchProductDetails(prodId, (product)=>{
        Cart.productCart(prodId, product.price)
        console.log(prodId)
    })
    console.log(prodId)
    res.redirect(`${req.url === "/add-to-cart" ? `/products/${prodId}` : "/"}`)
}