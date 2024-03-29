const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const {body, validationResult} = require("express-validator")


router.post("/signup",[
    body("name")
    .isLength({min: 3})
    .withMessage("Enter valid name"),
    body("email")
    .isEmail()
    .withMessage("Enter valid email"),
    body("password")
    .isLength({min: 5})
    .withMessage("Password must be atleast 5 characters long"),
    body("confirmPassword")
    .isLength({min: 5})
    .withMessage("Password must be atleast 5 characters long")
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
       res.header("Access-Control-Allow-Origin", "http://localhost:5173")
       res.header("Referrer-Policy", "no-referrer-when-downgrade")
    
       const redirectUrl = "http://127.0.0.1:3000/oauth"

       const OAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
       )

       const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/userinfo.profile openid",
        prompt: "consent"
       })

       res.json({url: authorizeUrl})

    }
}) 



module.exports = router