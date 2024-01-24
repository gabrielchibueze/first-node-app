const Products = require("../models/product");
const productModel = require("../models/product")


exports.getAddProduct = (req, res, next)=>{
    res.render("admin/add-product", {pageTitle: "Add Product", path: "/add-product"});
};

exports.postAddProduct = (req, res, next)=>{
    const product = new Products({name: req.body.name, description: req.body.description, price: req.body.price, image: req.body.image});
    product.save();
    res.redirect("/admin/add-product")
};
exports.getProductList = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("admin/products", {prods: products, pageTitle: "All Products", path: "/admin/products"})
    })
};

