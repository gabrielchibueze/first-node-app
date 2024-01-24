const express = require("express");
const router = express.Router();
const productController = require("../controllers/product")

router.get("/add-product", productController.getAddProduct);

router.post("/add-product", productController.postAddProduct)
router.get("/products", productController.getProductList)

module.exports = router
