const express = require("express")
const router = express.Router()
const Movie = require("../models/movieModel")
const authMiddleware = require("../middleware/authMiddleware")


router.post("/add", authMiddleware,  async(req,res)=>{
    const {title, description, rating, link, poster, banner, ticketPrice, duration, dates} = req.body
   try{
       const movieData = new Movie({
           title,
           description,
           rating,
           link,
           poster,
           banner,
           ticketPrice,
           duration,
           dates
       })
      await movieData.save()
      res.json(movieData)
   }catch(err){
    console.log(err.message)
    res.status(500).json({ error: "Internal Server Error"})
   }
})

router.post("/edit/:id", authMiddleware, async(req,res)=>{
    const {title, description, rating, link, poster, banner, dates, ticketPrice, duration} = req.body
    const id = req.params.id

    try{
         await Movie.findByIdAndUpdate({_id: id},{
           title,
           description,
           rating,
           link,
           poster,
           banner,
           ticketPrice,
           duration,
           dates
        })
        const movie = await Movie.findOne({_id: id})

        res.json(movie) 
        
    }catch(err){
        console.log(err.message)
        res.json({
            error: "Internal Server Error"
        })
    }
})


router.post("/delete/:id", authMiddleware, async(req,res)=>{
     try{
        let data = await Movie.deleteOne({_id: req.params.id})
       if(data){
           res.json({
               success: "Movie deleted successfully"
           })
       }else{
           res.json({
             error: "Movie not deleted"  
           })
       }
     }catch(err){
        console.log(err.message)	
        res.json({
            message: "Internal server error"
        })
     }
})


router.post("/disable/:id", authMiddleware, async(req,res)=>{
       const id = req.params.id
       const movie = await Movie.findOne({_id: id})
       try{
       if(movie.disable === true){
           await Movie.findByIdAndUpdate({_id: id},{
               disable: false
           })
       }else{
           await Movie.findByIdAndUpdate({_id: id},{
               disable: true
        })
       }
       const data = await Movie.findOne({_id: id})

       res.json(data) 
       
   }catch(err){
       console.log(err.message)
       res.json({
           error: "Internal Server Error"
       })
   }
})


module.exports = router