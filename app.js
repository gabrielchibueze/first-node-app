const express = require("express")
const mongodb = require("mongodb")

const app = express()
const bodyParser = require("body-parser")
const path = require("path")

const mongoConnect = require("./utils/database").mongoConnect

const adminRoutes = require("./Routes/admin")
const shopRoutes = require("./Routes/shop")
const errorController = require("./controllers/error")

// const Product = require("./models/product")
const User = require("./models/user")
// const Order = require("./models/order")
// const OrderItem = require("./models/order-item")

app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next)=>{
    User.findUserById("65cdbcdec7c87594453c3664")
    .then(user =>{
        req.user = new User(user.username, user.email, user.password, user._id, user.cart);
        next();
    }).catch(err => console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.error404);


mongoConnect(()=>{
    app.listen(3500)
})