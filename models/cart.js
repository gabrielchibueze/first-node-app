const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json")

module.exports = class Cart {
    static productCart(id, productPrice){
         // Acess the cart file component

        fs.readFile(p, (err, fileComponent)=>{
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileComponent);
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
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err)
            })
        }); 
    };
    
};