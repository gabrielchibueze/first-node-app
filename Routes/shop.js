const express = require("express")
const router = express.Router()
const adminData = require("./admin")
// const {Module} = require("module")

router.get("/", (req, res, next)=>{
    const allProducts = adminData.products
    console.log(allProducts)
    res.render("shop", {prods: allProducts, pageTitle: "My Shop", path: "/"})
})

module.exports = router;