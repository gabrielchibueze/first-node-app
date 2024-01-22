const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const adminData = require("./Routes/admin")
const shopRoutes = require("./Routes/shop")

const app = express()
app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
// create a post url

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((req, res, next)=>{
    res.status(404).render("404")
})
app.listen(3000)