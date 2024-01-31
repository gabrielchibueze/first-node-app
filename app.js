const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const adminRoutes = require("./Routes/admin")
const shopRoutes = require("./Routes/shop")
const errorController = require("./controllers/error")

const app = express()
app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
// create a post url

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.error404)

app.listen(3500)