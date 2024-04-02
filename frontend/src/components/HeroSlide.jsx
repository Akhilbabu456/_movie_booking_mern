





import { useEffect, useState } from 'react';
import "./HeroSlide.css"
import { Link } from 'react-router-dom';
import Loader from './Loader';
export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // State to track active slide index

  const handleGet = async () => {
    try {
      setLoading(true)
      const url = "https://movie-booking-mern.vercel.app/api/user/movie";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
      });
      const data = await res.json();
      setLoading(false)
      setMovieList(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? movieList.length - 1 : activeSlide - 1); // Move to previous slide
  }

  const handleNextSlide = () => {
    setActiveSlide(activeSlide === movieList.length - 1 ? 0 : activeSlide + 1); // Move to next slide
  }

  return (
    <>
    {loading && <Loader/>}
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {movieList.map((_, index) => (
          <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === activeSlide ? 'active' : ''}></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {movieList.map((movie, index) => (
          <div key={index} className={`carousel-item ${index === activeSlide ? 'active' : ''}`}>
            <img src={movie.banner} className="d-block w-100" alt="..." />
            <div className="gradient-overlay"></div>
            <h1 className='slider-heading'>{movie.title}</h1>
        <button className='trailer'>
          <Link to={movie.link}>Watch Trailer</Link>      
             </button>
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={handlePrevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={handleNextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
    </>
  );
}

