

import  { useState, useEffect } from "react";
import { Button, useColorModeValue, useToast, Stack, VStack, HStack } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";



const BookingPage = () => {
  const user = localStorage.getItem("token");
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    seats: "",
  });
  const [selected, setSelected] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({});
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false)
  const bgColor = useColorModeValue("green.200", "green.500");
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleData = async()=>{
    setLoading(true)
    let url = `https://movie-booking-mern.vercel.app/api/user/movie/${id}`;
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    let data = await res.json();
    setLoading(false)
    setData(data)
  }
  
  const handleGet = async () => {
    setLoading(true)
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
      setLoading(false)
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
    if (!selectedDate || !selected) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
    setLoading(true)
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
      if(order.error){
        toast({
          title: "All fields are required",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
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
            setLoading(false)
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
                title: "Booking failed",
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
      <div className="container1">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Book Ticket</h2>
              {/* <div className="input-field"> */}
              <h6 className="mt-4 mb-2">Dates:</h6>
                <HStack  m={{ base: 1, md: 2, xl: 4 }} 
                 >
                  {Array.isArray(movie) &&
                    movie.map((date, index) => {
                      const parts = date.split("-");
                      const day = parts[0];
                      const month = parts[1];
                      const year = parts[2]
                     return(

                      <Button
                      key={index}
                      
                      width="50px"
                      height="95px"
                      borderRadius={"25px"}
                      bg={selectedDate === index ? bgColor : "#5188ff"}
                      color={"white"}
                      onClick={() => {
                        setSelectedDate((prev) => (prev === index ? null : index));
                        setBooking((prevState) => ({ ...prevState, date }))
                      }}
                      
                    >
                      <div className=" text-center">{day}/
                      <br/>
                      {month}/
                      <br/>
                      {year}
                      </div>
                      
                      
                      
                    </Button>
                     )
                      
})}
                </HStack>
              {/* </div> */}
                <h6 className="mt-4 mb-0">Time:</h6><br/>
              <HStack  m={{ base: 1, md: 2, xl: 4 }} >
                <Button
                 
                 width="50px"
                      height="95px"
                      borderRadius={"25px"}
                  bg={selected === 0 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() => {
                    setSelected((prev) => (prev === 0 ? null : 0));
                    setBooking({ ...booking, time: "11.30 am" });
                  }}
                >
                  11<br/>
                  30 <br/>am
                </Button>
                <Button
                m={1}
                width="50px"
                height="95px"
                borderRadius={"25px"}
                  bg={selected === 1 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() => {
                    setSelected((prev) => (prev === 1 ? null : 1));
                    setBooking({ ...booking, time: "2.30 pm" });
                  }}
                >
                  2<br/>30<br/> pm
                </Button>
                <Button
                m={1}
                width="50px"
                height="95px"
                borderRadius={"25px"}
                  bg={selected === 2 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() => {
                    setSelected((prev) => (prev === 2 ? null : 2));
                    setBooking({ ...booking, time: "5.00 pm" });
                  }}
                >
                  5<br/>00<br/> pm
                </Button>
                <Button
                m={1}
                width="50px"
                height="95px"
                borderRadius={"25px"}
                  bg={selected === 3 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() => {
                    setSelected((prev) => (prev === 3 ? null : 3));
                    setBooking({ ...booking, time: "9.00 pm" });
                  }}
                >
                  9<br/>00<br/> pm
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
              {loading? <Loader size={5} color={"#fff"}/>: "Book Ticket"}
              </button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Want to go Back</h3>
              <Link to="/user" className="btn btn-dark justify-content-end">
                {" "}
                Back
              </Link>
            </div>
            <img src="/book.png" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
