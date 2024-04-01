// import {

//   Button,

//   useColorModeValue,
//   Link,
//   useToast,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import "../App.css"
// import { HStack } from "@chakra-ui/react";
// import Header from "../components/Header";
// import { useNavigate, useParams } from "react-router-dom";

// const BookingPage = ()=> {
//   const user = localStorage.getItem("token")
//   const [booking, setBooking] = useState({
//     date:"",
//     time: "",
//     seats: "",
//   })

//   const {id} = useParams()
//   const [selected, setSelected] = useState(false);
//   const [movie, setMovie] = useState("")
//   const bgColor = useColorModeValue("green.200", "green.700");
//   const toast = useToast()
//   const navigate = useNavigate()

//   const handleGet = async () => {
//     try {
//       //setLoading(true);
//       let url = `https://movie-booking-mern.vercel.app/api/user/movie/${id}`;
//       let res = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       });
//       let data = await res.json();
//       //setLoading(false);
//       setMovie(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//       toast({
//         title: "Unauthorized",
//         status: "error",
//         duration: 2500,
//         isClosable: true,
//       });
//     }
//     handleGet();
//   }, []);

//   const handleBooking = async()=>{

//   }

//   return (
//     <>
//     <Header/>
//     <div className="container1 ">

//         <div className="forms-container">

//           <div className="signin-signup">

//             <form action="#" className="sign-in-form"
//             //  onSubmit={handleAddMed}
//              >
//               <h2 className="title">Book Ticket</h2>
//               <div className="input-field">
//                 <p>Dates:</p>
//                 <div className="d-flex">
//                 {movie.dates.map((date, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         setBooking((prevState) => ({ ...prevState, date }))
//                       }
//                       className="btn btn-primary p-1 me-1"
//                     >
//                       {date}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <HStack>
//                   <Button
//                     bg={selected === 0 ? bgColor : "blue.400"}
//                     color={"black"}
//                     onClick={() => setSelected((prev) => (prev === 0 ? null : 0))}
//                   >
//                     11.30 am
//                   </Button>
//                   <Button
//                     bg={selected === 1 ? bgColor : "blue.400"}
//                     color={"black"}
//                     onClick={() => setSelected((prev) => (prev === 1 ? null : 1))}
//                   >
//                     2.30 pm
//                   </Button>
//                   <Button
//                     bg={selected === 2 ? bgColor : "blue.400"}
//                     color={"black"}
//                     onClick={() => setSelected((prev) => (prev === 2 ? null : 2))}
//                   >
//                     5.00 pm
//                   </Button>
//                   <Button
//                     bg={selected === 3 ? bgColor : "blue.400"}
//                     color={"black"}
//                     onClick={() => setSelected((prev) => (prev === 3 ? null : 3))}
//                   >
//                     9.00 pm
//                   </Button>
//                 </HStack>
//               <div className="input-field">
//                 <i className="fas fa-user"></i>
//                 <input type="number" placeholder="No of seat"
//                 // value={medicine.company}
//                 // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
//                 />
//               </div>

//               <button className="btn1 solid">
//                {/* onClick={handleAddMed}{loading? <Loader size={8} color={"#fff"}/>: "Add Medicine"} */}
//                onClick={handleBooking}
//                Book Ticket
//                </button>

//             </form>

//           </div>
//         </div>

//         <div className="panels-container">
//           <div className="panel left-panel">
//             <div className="content">
//               <h3>Want to go Back</h3>
//             <Link to="/users" className="btn btn-dark justify-content-end"> Back</Link>
//             </div>
//             <img src="/add.png" className="image" alt="" />
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default BookingPage

import React, { useState, useEffect } from "react";
import { Button, useColorModeValue, useToast, HStack } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

import TicketPage from "./TicketPage";

const BookingPage = () => {
  const user = localStorage.getItem("token");
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    seats: "",
  });
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState({});
  const [movie, setMovie] = useState([]);
  const bgColor = useColorModeValue("green.200", "green.700");
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleData = async()=>{
    let url = `https://movie-booking-mern.vercel.app/api/user/movie/${id}`;
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    let data = await res.json();
    setData(data)
  }
  
  const handleGet = async () => {
    try {
      let url = `https://movie-booking-mern.vercel.app/api/user/movie/${id}`;
      let res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      let data = await res.text();
      console.log("Response data:", data); // Log the response data
  
      try {
        data = JSON.parse(data); // Try parsing the response as JSON
        if (Array.isArray(data.dates)) {
          setMovie(data.dates); // Assuming dates is an array in the fetched movie data
        } else {
          setMovie([]);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle JSON parsing error here
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast({
        title: "Unauthorized",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
    handleGet();
    handleData()
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    const generateReceiptId = () => {
      // Generate a random string
      const randomString = Math.random().toString(36).substring(7);
      // Get current timestamp
      const timestamp = Date.now();
      // Concatenate timestamp and random string
      return `${timestamp}-${randomString}`;
    };

    const amount = data.ticketPrice * booking.seats * 100;
    const currency = "INR";
    const receiptId = generateReceiptId();

    try {
      const res = await fetch(`https://movie-booking-mern.vercel.app/api/user/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({amount, currency, receipt: receiptId}),
      });
      const order = await res.json();
      // console.log(order);
      console.log(order)
      var options = {
        key: "",
        amount,
        currency,
        name: "BookMyMovie",
        description: "Test transaction",
        // image: "https://i.ibb..co/5Y3m33n/test.png",
        order_id: order.id,
        handler: async (res) => {
          const body = {
            ...res,
            movieId: data._id,
            seats: booking.seats,
            time: booking.time,
            date: booking.date,
          };
          try {
            const res = await fetch(
              `https://movie-booking-mern.vercel.app/api/user/validate`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body),
              }
            );
            let data = await res.json();
            console.log(data)
            if (res.status === 200) {
              navigate(`/user/view/book/ticket/${data.bookingId}`);
              toast({
                title: "Booking Successful",
                status: "success",
                duration: 2500,
                isClosable: true,
              });
            } else {
              navigate("/user");
              toast({
                title: data.error,
                status: "error",
                duration: 2500,
                isClosable: true,
              });
            }
          } catch (err) {
            console.log(err);
            toast({
              title: "Internal server error",
              status: "error",
              duration: 2500,
              isClosable: true,
            });
          }
        },
        theme: {
          color: "43399cc",
        },
      };

      var rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", (res) => {
        alert(res.error.code);
        alert(res.error.description);
        alert(res.error.source);
        alert(res.error.step);
        alert(res.error.reason);
        alert(res.error.metadata.order_id);
        alert(res.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container1">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Book Ticket</h2>
              <div className="input-field">
                <p>Dates:</p>
                <div className="d-flex">
                  {Array.isArray(movie) &&
                    movie.map((date, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setBooking((prevState) => ({ ...prevState, date }))
                        }
                        className="btn btn-primary p-1 me-1"
                      >
                        {date}
                      </button>
                    ))}
                </div>
              </div>
              <HStack m={7}>
                <Button
                  bg={selected === 0 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() => {
                    setSelected((prev) => (prev === 0 ? null : 0));
                    setBooking({ ...booking, time: "11.30 am" });
                  }}
                >
                  11.30 am
                </Button>
                <Button
                  bg={selected === 1 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() => {
                    setSelected((prev) => (prev === 1 ? null : 1));
                    setBooking({ ...booking, time: "2.30 pm" });
                  }}
                >
                  2.30 pm
                </Button>
                <Button
                  bg={selected === 2 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() => {
                    setSelected((prev) => (prev === 2 ? null : 2));
                    setBooking({ ...booking, time: "5.00 pm" });
                  }}
                >
                  5.00 pm
                </Button>
                <Button
                  bg={selected === 3 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() => {
                    setSelected((prev) => (prev === 3 ? null : 3));
                    setBooking({ ...booking, time: "9.00 pm" });
                  }}
                >
                  9.00 pm
                </Button>
              </HStack>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="No of seat"
                  value={booking.seats}
                  onChange={(e) =>
                    setBooking({ ...booking, seats: e.target.value })
                  }
                />
              </div>

              <button className="btn1 solid" onClick={handleBooking}>
                Book Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Panels-container */}
      </div>
    </>
  );
};

export default BookingPage;
