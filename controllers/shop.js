const Carts = require("../models/cart");
const Sequelize = require("sequelize")
const Product = require("../models/product");

exports.getProducts = (req, res, next)=>{
    Product.findAll().then((products) =>{
        res.render("shop/products", {prods: products, pageTitle: "My Shop", path: "/"});
    }).catch(err => console.log(err))
}

exports.getProductDetails = (req, res, next)=>{
    const prodId = req.params.productId
    Product.findByPk(prodId).then(product =>{
        res.render("shop/product-details", {prods: product, path: "/"} )
    }).catch(err =>console.log(err))
}

exports.getCarts = (req, res, next)=>{
    req.user.getCart().then(carts =>{
        carts.getProducts().then(products =>{
            const totalPrice = products.reduce((total, current)=>{
                return total + (current.price * current.cartItem.quantity)
            }, 0)
            res.render("shop/cart", {prod: products, totalPrice: totalPrice, path: "/cart", pageTitle: "Shopping Cart"} )
        })
    }).catch(err => console.log(err))
};

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId;
    let newQuantity = 1;
    let fetchedCart;

    req.user.getCart().then(cart =>{
        fetchedCart = cart;
        return cart.getProducts({where: {id: prodId}})
    }).then(products =>{
        let product;
        if(products.length > 0){
            product = products[0]
        }
        if(product){
            newQuantity =  product.cartItem.quantity + 1
            return product
        }
        return Product.findByPk(prodId)
    }).then(product =>{
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
    }).catch(err => console.log(err))


    res.redirect(`${req.url === "/add-to-cart" ? `/products/${prodId}` : "/"}`)
}
exports.removeCart = (req, res, next)=>{
    const prodId = req.params.productId
    req.user.getCart().then(cart =>{
        return cart.getProducts({where: {id: prodId}}).then(products =>{
            const cartItem = products[0].cartItem;
            cartItem.destroy()
        })
    }).then(result => {
        res.redirect("/cart");
    }).catch(err => console.log(err))

}

exports.placeOrder = (req, res, next)=>{
    req.user.getCart().then(cart =>{
        return cart.getProducts()
    }).then(products =>{
        return req.user.createOrder().then(order =>{
            return order.addProducts(
                products.map((product)=>{
                   product.orderItem = { quantity: product.cartItem.quantity }
                   return product
                })
            )
        }).catch(err => console.log(err))
    }).then(order =>{
        res.redirect("/orders")
    }).catch(err => console.log(err))
}

exports.getOrders = (req, res, next)=>{
    req.user.getOrders().then(orders =>{
        // console.log()
        req.user.getProducts().then(products =>{
            let orderedItems = []
            for(let order of orders){
                const filteredProducts = products.filter((product, index) => product.id === order.id)
                orderedItems.push(filteredProducts)
            }
            console.log(orderedItems.flat())
            return orderedItems.flat()
        }).then(products =>{
            orderTotalPrice = products.reduce((total, current)=>{
                return total + current.price
            },0)
            res.render("shop/orders", {prod: products, totalPrice: orderTotalPrice, path: "/admin/orders", pageTitle: "Your Orders"} )
        })
    }).catch(err => console.log(err))

}