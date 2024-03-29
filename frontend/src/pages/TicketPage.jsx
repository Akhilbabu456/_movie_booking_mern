import React from 'react';
import QRCode from 'qrcode';
import Header from '../components/Header';
import "./TicketPage.css"

const TicketPage = ({ bookingId, numberOfSeats, name }) => {
  const [qrData, setQrData] = React.useState('');

  React.useEffect(() => {
    const generateQRCode = async () => {
      const qrCodeData = `${window.location.protocol}//${window.location.host}/#/booking/${bookingId}`;
      setQrData(await QRCode.toDataURL(qrCodeData));
    };

    generateQRCode();
  }, [bookingId]);

  return (
    <>
    <Header/>
    <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

<div className="ticket created-by-anniedotexe">
	<div className="left">
		<div className="image1">
			<div className="ticket-number">
				<p>
					#20030220
				</p>
			</div>
		</div>
		<div className="ticket-info">
			<p className="date">
				<span>TUESDAY</span>
				<span className="june-29">JUNE 29TH</span>
				<span>2021</span>
			</p>
			<div className="show-name">
				<h1>SOUR Prom</h1>
				<h2>Olivia Rodrigo</h2>
			</div>
			<div className="time">
				<p>8:00 PM </p>
			</div>
			
			
		</div>
	</div>
	<div className="right">
		
		<div className="right-info-container">
			
			<div className="barcode">
				<img src={qrData} alt="QR code"/>
			</div>
			<p className="ticket-number">
				#20030220
			</p>
		</div>
	</div>
</div>
    </>
  );
};

export default TicketPage;