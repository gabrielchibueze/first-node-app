const express = require("express")
const sequelize = require("./utils/database")

const app = express()
const bodyParser = require("body-parser")
const path = require("path")

const adminRoutes = require("./Routes/admin")
const shopRoutes = require("./Routes/shop")
const errorController = require("./controllers/error")

const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/cart-item")
const Order = require("./models/order")
const OrderItem = require("./models/order-item")

app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
// create a post url

app.use((req, res, next)=>{
    User.findByPk(1).then(user =>{
        req.user = user;
        next();
    }).catch(err => console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.error404);

Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User, )
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, {through: CartItem});
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

sequelize.sync()
// sequelize.sync({force: true})
.then(result =>{
    return User.findByPk(1);
}).then(user=>{
    if(!user){
        return User.create({firstName: "Gabriel", lastName: "Egwu", phone: "08146096278", email: "gabrielchibu@gmail.com", password: "Gabby"})
    }
    return user
}).then(user =>{
    return user.createCart()
}).then(cart =>{
    app.listen(3500)
}).catch(err => console.log(err))


