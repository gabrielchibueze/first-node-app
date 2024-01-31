const Products = require("../models/product");
const productModel = require("../models/product")

let deleteProduct;

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

exports.getOrders = (req, res, next)=>{
    Products.fetchAll((products)=>{
        res.render("admin/orders", {prods: products, path: "/admin/orders", pageTitle: "Your Orders"} )
    })
}

exports.editProduct = (req, res, next)=>{
    const prodId = req.params.productId
    Products.fetchProductDetails(prodId, product =>{
        res.render("admin/edit-product", {path: "/edit-product", prods: product, pageTitle: "Edit Product" })
    })
}

exports.saveEditedProduct = (req, res, next)=>{
    const prodId = req.params.productId
    const product = {name: req.body.name, description: req.body.description, price: req.body.price, image: req.body.image, id: req.body.productId}
    Products.saveUpdatedProduct(prodId, product)
    res.redirect("/admin/products")
}

exports.deleteProduct = (req, res, next)=>{
    deleteProduct = req.query.delete
    const prodId = req.body.productId
    Products.deleteProduct(prodId)
    res.redirect("/admin/products")
}
