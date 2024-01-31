const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json")
const writefile = (filename)=>{
    return fs.writeFile(p, JSON.stringify(filename), err =>{
        console.log(err)
    })
}
module.exports = class Cart {
    static productCart(id, productPrice){
         // Acess the cart file component

        fs.readFile(p, (err, fileContent)=>{
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            };
            
        // analyse the cart file to see if the product to be added to cart is already exsiting by using the provided product Id
            const checkExistingProdIndex = cart.products.findIndex(prod => prod.id === id);
            const checkExistingProd = cart.products[checkExistingProdIndex];

            let updatedProduct;
        // if the product already exist, increment the qty of the product
            if(checkExistingProd){
                updatedProduct = {...checkExistingProd};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]
                cart.products[checkExistingProdIndex] = updatedProduct;
            }
        // else, add product to cart and make the qty to be 1
            else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + (+productPrice)
            writefile(cart)
        }); 
    };

 
    static fetchCart(cb){
        fs.readFile(p, (err, fileContent)=>{
            let cart = JSON.parse(fileContent)
            if(err){
                cb(null)
            }
            else {
                cb(cart)
            }
        })
    }
    static removeCart(id, productprice){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return
            }
            const cart = JSON.parse(fileContent);
            let updatedCart = {...cart};
            let removedItem = updatedCart.products.find(prod => prod.id === id)
            updatedCart.products = updatedCart.products.filter(prod => prod.id !==id)
            
            updatedCart.totalPrice = updatedCart.totalPrice - productprice * removedItem.qty 
            writefile(updatedCart)
        })
    }
};