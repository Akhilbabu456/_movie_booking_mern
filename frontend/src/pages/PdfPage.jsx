import "./TicketPage.css"
import { QRCodeSVG } from "qrcode.react";


const PdfPage = ({ ticketId, date, seats, time, title, poster }) => {

return (
    <>
    <link rel="stylesheet"
             href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

<div className="ticket created-by-anniedotexe">
	<div className="left">
		<div className="image1" style={{
			height: "300px",
			width: "350px",
			backgroundImage: `url(${poster})`,
			backgroundSize: "cover",
			opacity: "0.85"

		}}>
			
			<div className="ticket-number">
				<p>
					{ticketId}
				</p>
			</div>
		</div>
		<div className="ticket-info">
			<p className="date">
				{date}
			</p>
			<div className="show-name">
				{title}
			</div>
			<div className="time">
				<p>Time: {time}</p>
				<p>Seats: {seats}</p>
				
			</div>
			
			
		</div>
	</div>
	<div className="right">
		
		<div className="right-info-container">
			
			<div className="barcode">
			<QRCodeSVG
                      value={`
                      Movie name: ${title}
                      Show date: ${date}
                      Show time: ${time}
                      Number of tickets: ${seats}
                      Booking ID: ${ticketId}
                      `}
                    />
			</div>
			<p className="ticket-number">
				{ticketId}
			</p>
		</div>
	</div>
</div>
    </>
  );
};

export default PdfPage;