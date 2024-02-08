const { Sequelize, where } = require("sequelize");
const Product = require("../models/product");

let deleteProduct;

exports.getAddProduct = (req, res, next)=>{
    res.render("admin/add-product", {pageTitle: "Add Product", path: "/add-product"});
};

exports.postAddProduct = (req, res, next)=>{
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    
    req.user.createProduct({
        name: name,
        price: price,
        description: description,
        image: image,
    }).then(console.log("product created for you")).catch(err => console.log(err))

    res.redirect("/admin/add-product")

};

exports.getProductList = (req, res, next)=>{
    Product.findAll().then((products)=>{
        res.render("admin/products", {prods: products, pageTitle: "All Products", path: "/admin/products"})
    }).catch(err=>console.log(err))
};

exports.editProduct = (req, res, next)=>{
    const prodId = req.params.productId
    req.user.getProducts({where: {id: prodId}}).then(product =>{
        console.log(product)
        res.render("admin/edit-product", {path: "/edit-product", prods: product[0], pageTitle: "Edit Product" })
    })
}

exports.saveEditedProduct = (req, res, next)=>{
    const prodId = req.params.productId
    const name = req.body.name;
    const  price = req.body.price;
    const description = req.body.description;
    const  image =req.body.image;

    Product.findByPk(prodId).then(product => {
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.save();
    }).then(console.log("You Have Successfully Updated Your Product")).catch(err => console.log(err));
    res.redirect("/admin/products")
}

exports.deleteProduct = (req, res, next)=>{
    deleteProduct = req.query.delete
    const prodId = req.body.productId
    Product.findByPk(prodId).then(product =>{
        product.destroy()
    }).catch(err => console.log(err))
    res.redirect("/admin/products")
}
