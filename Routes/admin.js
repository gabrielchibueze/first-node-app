const express = require("express");
const router = express.Router();
const productController = require("../controllers/product")

router.get("/add-product", productController.getAddProduct);

router.post("/add-product", productController.postAddProduct)
router.get("/products", productController.getProductList)
router.get("/edit-product/:productId", productController.editProduct)
router.post("/save-edited-product/:productId", productController.saveEditedProduct)
router.post("/delete-product", productController.deleteProduct)

module.exports = router
