const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))

//app.locals.someMethod = require("./helper/")
const routes = require("./routes")

app.use("/", routes)

app.listen(3000, function(){
    console.log("listen 3000")
})