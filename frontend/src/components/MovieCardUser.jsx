import { Link, useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Loader from "./Loader";

const MovieCardUser = () => {
  let user = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();
  let toast = useToast();

  const handleGet = async () => {
    try {
      setLoading(true);
      let url = "https://movie-booking-mern.vercel.app/api/user/movie";
      let res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      setLoading(false);
      // Filter movies that are not disabled
      const filteredMovies = data.filter((movie) => !movie.disable);
      setMovieList(filteredMovies);
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
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="row">
        {movieList.map((movie) => {
          return (
            <div key={movie._id} className="col-md-2 col-sm-6 col-xs-12">
              <div className="movie-card">
                <img src={movie.poster} alt="Avatar wallpaper" />
                <h3>{movie.title}</h3>
                <div className="content">
                  <h1>{movie.title}</h1>
                  <div className="infos">
                    <span>·&nbsp;&nbsp;2022&nbsp;&nbsp;·&nbsp;&nbsp;{movie.duration}</span>
                  </div>
                  <Link to={`/user/view/${movie._id}`} className="btn">
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieCardUser;
