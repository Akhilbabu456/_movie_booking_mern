var mongoose = require("mongoose")
const bookingSchema= mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
        
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    seats:{
        type: Number,
        required: true,
        default: 0,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie"
    }

})
module.exports= mongoose.model('booking', bookingSchema)