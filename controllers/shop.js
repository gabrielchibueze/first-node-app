// const Carts = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

exports.getProducts = (req, res, next)=>{
    Product.fetchAll().then((products) =>{
        res.render("shop/products", {prods: products, pageTitle: "My Shop", path: "/"});
    }).catch(err => console.log(err))
}

exports.getProductDetails = (req, res, next)=>{
    const prodId = req.params.productId
    Product.findById(prodId).then(product =>{
        console.log(product)
        res.render("shop/product-details", {prods: product, path: "/"} )
    }).catch(err =>console.log(err))
}


exports.getCarts = (req, res, next)=>{
    // let fetchedCart;
    // req.user.getCart().then(cart =>{
    //     fetchedCart = cart
    //     return Product.fetchAll()
    // }).then(products =>{
    //     let matchedProductInCart = []
    //     for(let items of fetchedCart){
    //         const filteredProducts = products.filter(prod => prod._id.toString() === items.productId.toString())
            
    //         filteredProducts.map(prod =>{
    //             let modifiedCart = {
    //                 product: prod, quantity: items.quantity
    //             };
    //             matchedProductInCart.push(modifiedCart)
    //         })        
    //     }
    //     return matchedProductInCart
    // })
    req.user.getCart()
    .then(matchProducts =>{
        console.log(matchProducts)
        const totalPrice = matchProducts.reduce((total, current) =>{
            return total + (parseFloat(current.price) * current.quantity)
        }, 0).toFixed(2)
        res.render("shop/cart", {prod: matchProducts, totalPrice: totalPrice,  path: "/cart", pageTitle: "Shopping Cart"} )
    })
    .catch(err => console.log(err))
};

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId;
    Product.findById(prodId).then(product =>{ 
        req.user.addToCart(product).then(result =>{
            console.log("added to cart")
        })
    })

    res.redirect(`${req.url === "/add-to-cart" ? `/products/${prodId}` : "/"}`)
}
// exports.removeCart = (req, res, next)=>{
//     const prodId = req.params.productId
//     req.user.getCart().then(cart =>{
//         return cart.getProducts({where: {id: prodId}}).then(products =>{
//             const cartItem = products[0].cartItem;
//             cartItem.destroy()
//         })
//     }).then(result => {
//         res.redirect("/cart");
//     }).catch(err => console.log(err))

// }

// exports.placeOrder = (req, res, next)=>{
//     let fetchedCart
//     req.user.getCart().then(cart =>{
//         fetchedCart = cart
//         return cart.getProducts()
//     }).then(products =>{
//         return req.user.createOrder().then(order =>{
//            return order.addProducts(
//                 products.map(product=>{
//                    product.orderItem = { quantity: product.cartItem.quantity, totalPrice: product.price * product.cartItem.quantity };
//                    return product;
//                 })
//             )
//         }).catch(err => console.log(err))
//     }).then(result =>{
//         fetchedCart.setProducts(null)
//     }).then(result =>{
//         res.redirect("/orders").catch(err => console.log(err))
//     }).catch(err => console.log(err))
// }

// exports.getOrders = (req, res, next)=>{
//     req.user.getOrders({include: ["products"]}).then(orders =>{
//     const currentOrderTotalPrice = orders.map(order => {
//         return order.products.reduce((total, current)=>{
//             return total + current.orderItem.totalPrice
//         }, 0)
//     })
    
//     const allOrderTotalPrice = currentOrderTotalPrice.reduce((total, current)=>{
//         return total + current
//     }, 0)

//     res.render("shop/orders", {prod: orders, totalPrice: allOrderTotalPrice, path: "/admin/orders", pageTitle: "Your Orders"} )
//     }).catch(err => console.log(err))

// }