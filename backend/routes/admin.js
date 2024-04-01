const express = require("express")
const router = express.Router()
const Movie = require("../models/movieModel")
const authMiddleware = require("../middleware/authMiddleware")
const { body, validationResult } = require("express-validator");


router.post("/add", authMiddleware,
[
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required").isLength({max: 150}).withMessage("Description length should be less than 150"),
    body("rating").notEmpty().withMessage("Rating is required"),
    body("link").notEmpty().withMessage("Link is required"),
    body("poster").notEmpty().withMessage("Poster is required"),
    body("banner").notEmpty().withMessage("Banner is required"),
    body("ticketPrice")
      .notEmpty()
      .withMessage("Ticket Price is required")
      .isNumeric()
      .withMessage("Ticket Price must be a number"),
    body("duration")
      .notEmpty()
      .withMessage("Duration is required"), 
    body("dates").notEmpty().withMessage("Dates are required"),
  ],  async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a 400 status with the array of validation errors
      return res.status(400).json({ errors: errors.array() });
    }
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

router.post("/edit/:id", authMiddleware,[
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required").isLength({max: 150}).withMessage("Description length should be less than 150"),
    body("rating").notEmpty().withMessage("Rating is required"),
    body("link").notEmpty().withMessage("Link is required"),
    body("poster").notEmpty().withMessage("Poster is required"),
    body("banner").notEmpty().withMessage("Banner is required"),
    body("ticketPrice")
      .notEmpty()
      .withMessage("Ticket Price is required")
      .isNumeric()
      .withMessage("Ticket Price must be a number"),
    body("duration")
      .notEmpty()
      .withMessage("Duration is required")
      .isNumeric()
      .withMessage("Duration must be a number"),
    body("dates").notEmpty().withMessage("Dates are required"),
  ],  async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a 400 status with the array of validation errors
      return res.status(400).json({ errors: errors.array() });
    }
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
           res.status(200).json({
               success: "Movie enabled successfully"
           })
       }else{
           await Movie.findByIdAndUpdate({_id: id},{
               disable: true
        })
        res.status(200).json({
            success: "Movie disabled successfully"
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