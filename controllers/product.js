const mongodb = require("mongodb");
const Product = require("../models/product");
const User = require("../models/user");


exports.getAddProduct = (req, res, next)=>{
    res.render("admin/add-product", {pageTitle: "Add Product", path: "/add-product"});
};

exports.postAddProduct = (req, res, next)=>{
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const userId = req.user._id

    const product = new Product(name,description, price, imageUrl, null, userId)
    product.save().then(result =>{
        console.log("product created for you")
        // console.log(result)
    }).catch(err => console.log(err))
    
    res.redirect("/admin/add-product")

};

exports.getProductList = (req, res, next)=>{
    Product.fetchAll().then((products)=>{
        res.render("admin/products", {prods: products, pageTitle: "All Products", path: "/admin/products"})
    }).catch(err=>console.log(err))
};

exports.editProduct = (req, res, next)=>{
    const prodId = req.params.productId
    Product.findById(prodId).then(product =>{
        console.log(product)
        res.render("admin/edit-product", {path: "/edit-product", prods: product, pageTitle: "Edit Product" })
    })
}

exports.saveEditedProduct = (req, res, next)=>{
    const prodId = req.params.productId
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

   const product = new Product(name, description, price, imageUrl, prodId, req.user._id)
   product.save()
   .then(result=>{
    console.log(result);
    res.redirect("/admin/products")

   })
   .catch(err => {
    console.log(err)
   })

}

exports.deleteProduct = (req, res, next)=>{
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect("/admin/products")
}
