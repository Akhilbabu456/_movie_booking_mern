const connectToMongo = require("./config/db")
const express= require("express")
const dotenv = require("dotenv")
const cors = require("cors")	

const app = express()
dotenv.config()
const port = process.env.PORT
connectToMongo()

const userRoute = require("./routes/user")
//const adminRoute = require("./routes/admin")

app.use(cors({origin: true}))
app.use(express.json())

app.use("/api/admin", userRoute)
//app.use("/api/user", adminRoute)

app.listen(port, ()=>{
    console.log(`Listening to port http://localhost:${port}`)
})
