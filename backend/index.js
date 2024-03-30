const connectToMongo = require("./config/db")
const express= require("express")
const dotenv = require("dotenv")
const cors = require("cors")	
const jwt = require("jsonwebtoken")
const session = require('express-session');

const app = express()
dotenv.config()
const port = process.env.PORT
connectToMongo()
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // session cookie lasts for 24 hours
}));

const userRoute = require("./routes/user")
const adminRoute = require("./routes/admin")

app.use(cors({origin: true}))
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)




app.listen(port, ()=>{
    console.log(`Listening to port http://localhost:${port}`)
})
