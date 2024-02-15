const express = require("express")
const router = express.Router()
const shopController = require("../controllers/shop")

router.get("/", shopController.getProducts);
router.get("/cart", shopController.getCarts)
router.get("/products/:productId", shopController.getProductDetails)
router.post("/add-to-cart", shopController.postCart)
router.post("/shop-add-to-cart", shopController.postCart)
// router.post("/remove-cart/:productId", shopController.removeCart)
// router.post("/place-order", shopController.placeOrder)
// router.get("/orders", shopController.getOrders)

module.exports = router;