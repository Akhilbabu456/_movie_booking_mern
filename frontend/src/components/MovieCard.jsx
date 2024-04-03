import { Link, useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Loader from "./Loader";

const MovieCard = () => {
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
    // const timeOut = setTimeout(()=>{
      // }, 500)
      // return () => clearTimeout(timeOut)
      handleGet()
  },[])

  return (
    <div className="container-fluid">
    {loading && <Loader/>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-2 ">
      {movieList.map((movie)=>{
         return (
          <>
        <div key={movie._id} className="col mb-4 d-flex justify-content-center">
          <div className="movie-card">
            <img
              src={movie.poster}
              alt="Avatar wallpaper"
            />
               
               <div className="overlay"></div>
               <div className="content">
                 <h1>{movie.title}</h1>
                 <div className="infos">
                   <span className="ms-5">&nbsp;&nbsp;&nbsp;📅2024&nbsp;&nbsp;&nbsp;&nbsp;⌛{movie.duration}</span>
                   
                 </div>
                 <h5 className="rating">⭐{movie.rating}/10</h5>

             

              <Link to={`/user/view/${movie._id}`} className="btn">
                View
              </Link>
            </div>
          </div>
        </div>
        </>
         )
      })}
      </div>
    </div>
  );
};

export default MovieCard;
