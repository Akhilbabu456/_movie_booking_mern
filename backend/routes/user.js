const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const crypto = require("crypto");
const {body, validationResult} = require("express-validator")
const Razorpay = require('razorpay')
const nodemailer = require('nodemailer')
const generateToken = require("../config/generateToken");
const verify = require("../models/verifyModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const authMiddleware = require("../middleware/authMiddleware");
const Movie = require("../models/movieModel");

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
        const {name, email, password, confirmPassword} = req.body
        const token = generateToken(email)
        const data = await User.findOne({email: email})
        if(data){
          res.status(400).json({error: "Email already exists"})
        }else{

          try {
              let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 465,
                  secure: true,
                  auth: {
                    user: "akhilbeliever001@gmail.com",
                    pass: "prukmblhnwcenoco",
                  }
                });
          
              const mailOptions = {
                from: "akhilbeliever001@gmail.com",
                to: email,
                subject: 'Email Verification',
                text: 'Please click the link below to verify your email:',
                html: `<a href="https://movie-booking-mern.vercel.app/api/user/verify-email/${token}">Verify Email</a>`,
              };
          
             const send = await transporter.sendMail(mailOptions)
             if(send){
                 const check = await new verify({
                   name,
                   email,
                   password,
                   token
                 })
                 await check.save()
                 res.status(200).json({ success: 'Verification email sent' , token: check._id})
             }else{
                 res.status(500).json({ error: 'Failed to send verification email' });
  
             }
            } catch (error) {
              console.log(error)
            }
        }
       

    }
}) 

router.get("/verify/:id", async(req,res)=>{
  const id = req.params.id
  
    const verified = await verify.findOne({_id: id})
    

  
  if(!verified){
    res.status(200).json({ success: 'Account Created' });
  }else{
    res.status(400).json({ error: 'Email not verified' });
  }
})

router.get('/verify-email/:id', async(req, res) => {
  const token = req.params.id
  const userData = await verify.findOne({ token: token})
  
  if(userData.token == token){
    const saltRound = 10
    const hashedPassword = await bcrypt.hash(userData.password, saltRound)
    const user = await new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    })
    await user.save()
   if(user){
    res.status(200).json({ success: 'User created successfully',
     data: user });
   }
   await verify.deleteOne({token: token})
  }else{
    res.status(400).json({ error: 'Enter correct email' });
    await verify.deleteOne({token: token})
  }
});

router.post("/login", [
  body("email")
  .isEmail()
  .withMessage("Enter valid email"),
  body("password")
  .notEmpty()
  .withMessage("Password cannot be empty")	
], async(req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
  }else{
      const data = await User.findOne({email: req.body.email})
      const passwordCompare = await bcrypt.compare(req.body.password, data.password)
      try{
          if(data && passwordCompare){
            const token = generateToken(data._id)
            res.json({
              data: data,
              token: token
          })
          }else{
            return res.status(400).json({
                  error: "Invalid credentials"
              })
          }
      }catch(err){
          console.log(err.message)	
          res.json({
              error: "Internal server error"
          })
      }
  }

})

router.get("/movie", authMiddleware, async(req,res)=>{
  try{
    const movies = await Movie.find({})
    res.json(movies)
  }catch(err){
    console.log(err.message)
    res.status(400).json({
      error: "Internal server error"
    })
  }
})

router.get("/movie/:id", authMiddleware, async(req,res)=>{
  const id = req.params.id
  try{
    const movie = await Movie.findOne({_id: id})
    res.json(movie)
  }catch(err){
    console.log(err.message)
    res.status(400).json({
      error: "Internal server error"
    })
  }
})


// router.post("/movie/book/:id", authMiddleware, async(req,res)=>{
//   const id = req.params.id
//   const { date, time, seats} = req.body
//   const userId = req.user.id
//   const movie = await Movie.findOne({_id: id})
//   try{
//     const booking = await new Booking({
//         user : userId,
//         movie : id,
//         date ,
//         time,
//         seats
//     })
//     await booking.save()

//     const razorpayClient = new razorpay({
//       key_id: 'rzp_test_7qtDyF7UTRLDBn',
//       key_secret: 'dnNfgM4CtypK8ZemazFojhd3'
//     })

//     const order = await razorpayClient.orders.create({
//        amount: (movie.ticketPrice * seats)*100,
//        currency: 'INR',
//        receipt: 'receipt#1',
//        payment_capture: 1
//     })

//     let collection = movie.collections + (movie.ticketPrice * seats)

//     if(order){
//       await Movie.findByIdAndUpdate({_id: id}, {
//         collections: collection
//       })

//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: "akhilbeliever001@gmail.com",
//           pass: "prukmblhnwcenoco",
//         }
//       });

//     const mailOptions = {
//       from: "akhilbeliever001@gmail.com",
//       to: req.user.email,
//       subject: 'Movie Booking Confirmation',
//       text: `Dear ${req.user.name},

//       Your movie booking for movie ID ${id} has been successfully confirmed.
//       Your booking id ${booking._id}

//       Payment Details:
//       Amount: ${movie.ticketPrice * seats}
//       Payment ID: ${order.id}
//       Payment Status: ${order.status}


//       Regards,
//       Movie Booking Website`
//     };

//     await transporter.sendMail(mailOptions)

//     res.status(200).json({
//       success: "Ticket booked succcessfully"
//     })
//     }else{
//       await Booking.deleteOne({_id: booking._id})

//       res.status(400).json({
//         error: "Payment failed"	
//       })
//     }
//   }catch(err){
//     console.log(err)
//     res.status(400).json({
//       error: "Internal server error"
//     })
//   }
// })

router.post("/order", authMiddleware, async (req, res) => {

  try {

      const razorpay = new Razorpay({
          key_id: 'rzp_test_7qtDyF7UTRLDBn',
          key_secret: 'dnNfgM4CtypK8ZemazFojhd3'
      });

      if(!req.body){
          return res.status(400).send("Bad Request");

      }
      const options = req.body;

      const order = await razorpay.orders.create(options);

      if(!order){
          return res.status(400).send("Bad Request");
      }

      res.json(order);
      
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
})

router.post("/validate", authMiddleware, async (req, res) => {
  // const id = req.params.id
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    seats,
    time,
    date,
    movieId
  } = req.body;
  const movie = await Movie.findOne({_id: movieId})
  const userId = req.user.id
  console.log(req.body);

  let bookingId;
  let user;
 
 
  try {
  console.log("validation started")
    const sha = crypto.createHmac("sha256", "dnNfgM4CtypK8ZemazFojhd3");

    //razorpay_order_id + " | " + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ message: "Transaction is not legit!" });
    } else {
      console.log("booking started")
      const booking = await new Booking({
        user : userId,
        movie : movie._id,
        date ,
        time,
        seats
    })
    await booking.save()
      bookingId = booking._id;

      let collection = movie.collections + (movie.ticketPrice * seats)
      await Movie.findByIdAndUpdate({_id: movie._id}, {
        collections: collection
      })

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "akhilbeliever001@gmail.com",
          pass: "prukmblhnwcenoco",
        }
      });

    const mailOptions = {
      from: "akhilbeliever001@gmail.com",
      to: req.user.email,
      subject: 'Movie Booking Confirmation',
      text: `Dear ${req.user.name},

      Your movie booking for movie ID ${movie._id} has been successfully confirmed.
      Your booking id ${booking._id}

      Payment Details:
      Amount: ${movie.ticketPrice * seats}
      Payment ID: Receipt2
      Payment Status: success


      Regards,
      Movie Booking Website`
    };
      await transporter.sendMail(mailOptions)
     console.log(booking.id)
    res.status(200).json({
      success: "Ticket booked succcessfully",
      bookingId
    })
    }
  }catch(err){
    console.log(err)
    res.status(400).json({
      error: "Internal server error"
    })
  }

  
})






module.exports = router