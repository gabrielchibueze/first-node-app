const Products = require("../models/product");

exports.getProducts = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("shop/shop", {prods: products, pageTitle: "My Shop", path: "/"});
    })
}

exports.getCarts = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("shop/cart", {prods: products, path: "/cart", pageTitle: "Shopping Cart"} )
    })
}