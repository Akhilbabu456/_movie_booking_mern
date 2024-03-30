var mongoose = require("mongoose")
const userSchema= mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    booked:{
        type: Number,
        required: true,
        default: 0,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }

})
module.exports= mongoose.model('Users', userSchema)