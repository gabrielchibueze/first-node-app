const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json")

module.exports = class Products{
    constructor(prods){
        this.name = prods.name,
        this.description = prods.description,
        this.price = prods.price,
        this.image = prods.image
        this.id = Math.random().toString()
    }

    save(){
        fs.readFile(p, (err, fileContent)=>{
            let products = []
            if(!err){
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err)
            })
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
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err)
            })
        })
    }

    static fetchAll(cb){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return null
            }
            return cb(JSON.parse(fileContent))
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