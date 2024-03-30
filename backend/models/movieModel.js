var mongoose = require("mongoose")
const movieSchema= mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        default: 0,
    },
    link: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    collections: {
        type: Number,
        default: 0
    },
    disable: {
        type: Boolean,
        default: false
    },
    dates: {
        type: [String],
        default: [],
        required: true
    }

})
module.exports= mongoose.model('movie', movieSchema)