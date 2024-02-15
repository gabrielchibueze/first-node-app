const getDb = require("../utils/database").getDb
const mongodb = require("mongodb")

class User {
    constructor(username, email, password, id, cart){
        this.username = username,
        this.email = email,
        this.password = password,
        this._id = id
        this.cart = cart 
    }

//  cart = {items: [], totalPrice: 88}

    save(){
        const db = getDb();
       return db.collection("user").insertOne(this)
    }

    async addToCart(product){
        const db = await getDb();
        const newAddedToCart = [...this.cart.items]

            const updatedCartIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString())

            if(updatedCartIndex >=0){
                const newQuantity = this.cart.items[updatedCartIndex].quantity + 1;      
                newAddedToCart[updatedCartIndex].quantity = newQuantity     
            }
            else {
                newAddedToCart.push({productId: product._id, quantity:  1})
            }
            const updatedCart = {
                items: newAddedToCart
            }

            return db.collection("user")
            .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})
            .then(result =>{
                console.log(result)
                return product
            })
            .catch(err => console.log(err))

    }

    getCart(){
        const db = getDb();
        const productId = this.cart.items.map(item => item.productId)

        return db.collection("products")
        .find({_id: {$in: productId}})
        .toArray()
        .then(products =>{
            return products.map(product =>{
                let productQuantity =  this.cart.items.find(items => items.productId.toString() === product._id.toString()).quantity
                return {...product, quantity: productQuantity}
            })
        }).catch(err => console.log(err))
    }

    static findUserById(userId){
        const db = getDb();
        return db.collection("user").
        findOne({_id: new mongodb.ObjectId(userId)})
    }
}

module.exports = User