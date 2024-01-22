const express = require("express");
const router = express.Router();
const products = [];
router.get("/add-product", (req, res, next)=>{
    res.render("product", {pageTitle: "Add Product", path: "/add-product"});
});

router.post("/add-product", (req, res, next)=>{

    products.push({name: req.body.name, description: req.body.description, price: req.body.price, image: req.body.image});
    console.log(req.body);
})

exports.routes = router;
exports.products = products;