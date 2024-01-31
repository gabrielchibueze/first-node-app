const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json")

const writeFile =(products)=>{
    fs.writeFile(p, JSON.stringify(products), (err)=>{
    })
}

module.exports = class Products{
    constructor(prods){
        this.name = prods.name,
        this.description = prods.description,
        this.price = prods.price,
        this.image = prods.image
        this.id = Math.random().toString().split(".").join("")
    }

    save(){
        fs.readFile(p, (err, fileContent)=>{
            let products = []
            if(!err){
                products = JSON.parse(fileContent)
            }
            products.push(this)
            writeFile(products)
        })
    }

    static saveUpdatedProduct(id, prod){
        fs.readFile(p, (err, fileContent)=>{
            let products = []
            if(!err){
                products = JSON.parse(fileContent)
            }
            const updatedProductIndex = products.findIndex(prod => prod.id === id);
            products = [...products]
            products[updatedProductIndex] = prod
            writeFile(products)
        })
    }

    static deleteProduct(id){
        fs.readFile(p, (err, fileContent)=>{
            let products = [];
            if(!err){
                products = JSON.parse(fileContent)
            }
            const deletedProductIndex = products.findIndex(prod => prod.id === id);
            const deletedProductPrice = products[deletedProductIndex].price

            Cart.removeCart(id, deletedProductPrice)
            const updatedProducts = products.filter(prod => prod.id !==id)
            writeFile(updatedProducts)

            if(updatedProducts.length < 1){
                const porductReset = []
                writeFile(porductReset)
            }
        })
    }

    static fetchAll(cb){
        fs.readFile(p, (err, fileContent)=>{
            if(err || fileContent.length === 0){
                cb([])
            }
            else {
                cb(JSON.parse(fileContent))
            }
        })
    }


    static fetchProductDetails(id, cb){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return null
            }
            const product = JSON.parse(fileContent).find(prod => prod.id === id)
            cb(product)
        })
    }

}