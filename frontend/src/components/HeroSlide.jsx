
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import "./HeroSlide.css"
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function App() {
  let user = localStorage.getItem("token");
  const [loading, setLoading] = useState(false)
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate()
  let toast = useToast()

  const handleGet = async()=>{
    try{
      setLoading(true)
      let url = "https://movie-booking-mern.vercel.app/api/user/movie"
       let res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
       })
       let data = await res.json()
       setLoading(false)
       setMovieList(data)
     }catch(err){
         console.log(err)
     }
  }

  useEffect(()=>{
    if(!user){
      navigate("/")
      toast({
        title: "Unauthorized",
        status: "error",
        duration: 2500,
        isClosable: true,
      })
    }
   handleGet()
  },[])
  return (
    <>
    

<MDBCarousel showIndicators showControls>
  {movieList.map((movie, index) => (
    <MDBCarouselItem key={index+1} itemId={index+1}>
      <div className="img">
        <img src={movie.banner} className='d-block w-100' alt='...' />
        <div className="gradient-overlay"></div>
      </div>
      <MDBCarouselCaption>
        <h1 className='slider-heading'>{movie.title}</h1>
        <button className='trailer'>
          <Link to={movie.link}>Watch Trailer</Link>
        </button>
      </MDBCarouselCaption>
    </MDBCarouselItem>
  ))}
</MDBCarousel>

    </>
  );
}