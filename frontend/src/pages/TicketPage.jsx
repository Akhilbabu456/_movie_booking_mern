
import { QRCodeSVG } from "qrcode.react";
import Header from '../components/Header';
import "./TicketPage.css"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";


const TicketPage = () => {
	const user = localStorage.getItem("token")
    const {id} = useParams()
	const navigate = useNavigate()
	const toast = useToast()
	const [ticket, setTicket] = useState([])
	const [movieData, setMovieData] = useState([])
	console.log(ticket.movie)

	const ticketDetail = async()=>{
		const response = await fetch(`http://localhost:3000/api/user/ticket/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization" : localStorage.getItem("token")
			}
		})
		const data = await response.json()
		console.log(data)
		movieDetail(data)
       await setTicket(data)
	}

	const movieDetail = async(id)=>{
		const response = await fetch(`http://localhost:3000/api/user/movie/${id.movie}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization" : localStorage.getItem("token")
			}
		})
		const data = await response.json()
        setMovieData(data)
	}

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
		ticketDetail();
        
    }, []);

	// useEffect(()=>{
	// 	movieDetail();
	// })
	

  return (
    <>
    <Header/>
    <link rel="stylesheet"
             href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

<div className="ticket created-by-anniedotexe">
	<div className="left">
		<div className="image1" style={{
			height: "300px",
			width: "350px",
			backgroundImage: `url(${movieData.poster})`,
			backgroundSize: "cover",
			opacity: "0.85"

		}}>
			
			<div className="ticket-number">
				<p>
					{ticket._id}
				</p>
			</div>
		</div>
		<div className="ticket-info">
			<p className="date">
				{ticket.date}
			</p>
			<div className="show-name">
				{movieData.title}
			</div>
			<div className="time">
				<p>Time: {ticket.time}</p>
				<p>Seats: {ticket.seats}</p>
				
			</div>
			
			
		</div>
	</div>
	<div className="right">
		
		<div className="right-info-container">
			
			<div className="barcode">
			<QRCodeSVG
                      value={`
                      Movie name: ${movieData.title}
                      Show date: ${ticket.date}
                      Show time: ${ticket.time}
                      Number of tickets: ${ticket.seats}
                      Booking ID: ${ticket._id}
                      `}
                    />
			</div>
			<p className="ticket-number">
				{ticket._id}
			</p>
		</div>
	</div>
</div>
    </>
  );
};

export default TicketPage;