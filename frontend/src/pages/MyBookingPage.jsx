
import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";0

import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import generatePDF from "react-to-pdf";

import PdfPage from "./PdfPage";
import Loader from "../components/Loader";

const MyBookingPage = () => {
  const options = {
    filename: "Movie-Ticket",
    page: {
      margin: 20,
    },
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
 console.log(bookings)
  const handleDownload = (bookingId) => {
    console.log(bookingId);
    const getTargetElement = () => document.getElementById(bookingId);
    generatePDF(getTargetElement, options);
  };

  const myBooking = async () => {
    try {
      const res = await fetch(
        `https://movie-booking-mern.vercel.app/api/user/mybooking/${user.data._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setBookings(data.populatedBookings); // Assuming the response includes a 'booking' array
      } else {
        throw new Error("Failed to fetch bookings");
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
    } else {
      myBooking();
    }
  }, []);

  

  return (
    <>
      <Header />
 {loading && <Loader/>}
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <Card
            key={booking._id} // Add a unique key for each card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            w={"98%"}
            m={"20px"}
            boxShadow={
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            }
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={booking.poster} // Use the poster from booking data
              alt={booking.movieTitle} 
              filter='auto' brightness='70%'// Use the movie title as alt text
            />

            <HStack>
              <CardBody display="flex" gap={{base:'23px', sm: "60px", md: "300px", lg: "400px", xl: "600px"}} justifyContent='space-evenly'>
                <Box>
                  <Heading size="md">{booking.movieTitle}</Heading>{" "}
                  {/* Use movie title */}
                  <Text py="2">
                    Seats: {booking.seats},&nbsp;  📅: {booking.date}, 
                    &nbsp;⌛: {booking.time}
                  </Text>
                </Box>
                <Box ml={15}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}
                    data-backdrop="false"
                  >
                    View Ticket
                  </button>
                  {/* <button
                    className="btn btn-primary"
                    onClick={() => handleDownload(index)}
                  >
                    Download Ticket
                  </button> */}
                </Box>

                <div className="modal fade" id={`exampleModal${index}`} aria-hidden="true" data-backdrop="false">
                  <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5 text-secondary" id={`exampleModalLabel${index}`}>Download Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body text-secondary">
                        <div id={index}>
                          <PdfPage
                            ticketId={booking.bookingId}
                            poster={booking.poster}
                            title={booking.movieTitle}
                            seats={booking.seats}
                            date={booking.date}
                            time={booking.time}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleDownload(index)}
                        >
                          Download 
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
       
               </CardBody>
            </HStack>
          </Card> 
        ))
      ) : (
        <div className="m-5 justify-content-center">No bookings found</div>
      )}
    </>
  );
};

export default MyBookingPage;
