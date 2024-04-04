

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
 import "./HeroSlide.css"

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleGet = async () => {
    try {
      setLoading(true);
      const url = "https://movie-booking-mern.vercel.app/api/user/movie";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
      });
      const data = await res.json();
      setLoading(false);
      setMovieList(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? movieList.length - 1 : activeSlide - 1);
  }

  const handleNextSlide = () => {
    setActiveSlide(activeSlide === movieList.length - 1 ? 0 : activeSlide + 1);
  }

  return (
    <>
      {loading && <Loader />}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3500">
        {/* <ol className="carousel-indicators">
          {movieList.map((_, index) => (
            <li key={index} data-bs-target="#carouselExampleFade" data-bs-slide-to={index} className={index === activeSlide ? 'active' : ''}></li>
          ))}
        </ol> */}
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
        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-bs-slide="prev" onClick={handlePrevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-bs-slide="next" onClick={handleNextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </>
  );
}
