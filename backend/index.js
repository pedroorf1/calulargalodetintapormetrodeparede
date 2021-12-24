const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()
const Routes =  require("./Routes/app_routes")

//json response
app.use(express.json())

//static files
app.use(express.static("public"))

//solover cors //frontend host
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

//routes
app.use("/",Routes)

//starting app
app.listen(process.env.APP_PORT, () => {
    
})
