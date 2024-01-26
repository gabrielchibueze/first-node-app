const express = require("express")
const router = express.Router()
const shopController = require("../controllers/shop")
// const {Module} = require("module")
// const product = new Products()
// console.log(product.id)

router.get("/", shopController.getProducts);
router.get("/cart", shopController.getCarts)
router.get("/products/:productId", shopController.getProductDetails)
router.post("/add-to-cart", shopController.postCart)
router.post("/shop-add-to-cart", shopController.postCart)

// router.get("/", shopController.getProducts)


module.exports = router;