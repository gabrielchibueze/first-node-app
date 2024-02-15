const mongodb = require("mongodb")
const getDb = require("../utils/database").getDb

class Product {
    constructor (name, description, price, imageUrl, id, userId){
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null
        this.userId = userId
    };

    save(){
        const db = getDb()
        let dbInOp;
        if(this._id){
            dbInOp = db.collection("products").updateOne({_id: this._id}, {$set: this})
        }
        else{
             dbInOp = db.collection("products").insertOne(this)
        }
        return dbInOp.then(result=>{
            console.log(result)
        }).catch(err=> console.log(err))
    }

    static fetchAll(){
        const db = getDb()
        return db.collection("products")
        .find()
        .toArray()
        .then(products =>{
            // console.log(products)
            return products
        })
        .catch(err => console.Consolelog(err))
    }

    static findById(prodId){
        const db = getDb();
        return db.collection("products")
        .find({_id: new mongodb.ObjectId(prodId)})
        .next()
        .then(product =>{
            return product
        })
        .catch(err => {
            console.log(err)
        })
    }


    static deleteById(prodId){
        const db = getDb();
        return db.collection("products")
        .deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result=>{
            console.log("deleted")
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = Product
