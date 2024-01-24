const express = require("express")
const router = express.Router()
const shopController = require("../controllers/shop")
// const {Module} = require("module")

router.get("/", shopController.getProducts);
router.get("/cart", shopController.getCarts)
// router.get("/", shopController.getProducts)


module.exports = router;