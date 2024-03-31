
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import "./HeroSlide.css"

export default function App() {
  return (
    <MDBCarousel showControls fade>
      <MDBCarouselItem itemId={1}>
      <div className="img">
        <img src='https://images.hdqwalls.com/wallpapers/bthumb/avatar-the-way-of-the-water-2022-5k-u1.jpg' className='d-block w-100' alt='...' />
        <div className="gradient-overlay"></div>
        </div>
        <MDBCarouselCaption>
          <h1 className='slider-heading'>First slide label</h1>
          <p className='slider-content'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <button className='trailer'>
            <Link>Watch Trailer</Link>
          </button>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <div className="img">
        <img src='https://images.hdqwalls.com/wallpapers/bthumb/avatar-the-way-of-the-water-2022-5k-u1.jpg' className='d-block w-100' alt='...' />
        <div className="gradient-overlay"></div>
        </div>

        <MDBCarouselCaption>
        <h1 className='heading'>First slide label</h1>
          <p className='content'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <button className='btn'>
            <Link>Watch Trailer</Link>
          </button>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
      <div className="img">
        <img src='https://images.hdqwalls.com/wallpapers/bthumb/avatar-the-way-of-the-water-2022-5k-u1.jpg' className='d-block w-100' alt='...' />
        <div className="gradient-overlay"></div>
        </div>
        <MDBCarouselCaption>
        <h1 className='heading'>First slide label</h1>
          <p className='content'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <button className='btn'>
            <Link>Watch Trailer</Link>
          </button>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}