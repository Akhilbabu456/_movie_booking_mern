import { useToast } from "@chakra-ui/react";
import "./MovieView.css";
import { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const MovieView = () => {
  const [movie, setMovie] = useState([]);
  let user = localStorage.getItem("token");
  let detail = JSON.parse(localStorage.getItem("user"));
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate()
  // setRole(detail.data.role)
  useEffect(() => {
    setRole(detail?.data?.role || "");
  }, [detail]);

  const handleGet = async () => {
    try {
      setLoading(true);
      let url = `https://movie-booking-mern.vercel.app/api/user/movie/${id}`;
      let res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      setLoading(false);
      setMovie(data);
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

  const handleDelete = async()=>{
    setLoading(true)
    try{
       let url = `https://movie-booking-mern.vercel.app/api/admin/delete/${id}`
      let res = await fetch(url, {
         method: "POST",
         headers:{
           "Content-Type": "application/json",
           "Authorization" :`${localStorage.getItem("token")}`
         }
       })
       if(res.ok){
        navigate("/user")
         toast({
          title: "Deleted",
          description: "Movie Deleted Successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
        setLoading(false)
        
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleDisable = async()=>{
    setLoading(true)
    try{
      let url = `https://movie-booking-mern.vercel.app/api/admin/disable/${id}`
      let res = await fetch(url, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization" :`${localStorage.getItem("token")}`
        }
      })
      setLoading(false)
      if(res.ok){
        navigate("/admin")
        toast({
          title: "Movie disabled",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }else{
        toast({
          title: "Movie not disabled",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
     {loading && <Loader/>}

      <article className="details-page">
        <img
          src={movie.banner}
          //alt={`Backdrop Image for ${movie.title}`}
          className="backdrop-image"
        />

        <div className="info">
          <img
            src={movie.poster}
            //alt={`Cover Image for ${movie.title}`}
            className="cover-image"
          />
          <div className="movie-overview-section">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="date-and-runtime">
              <p>2024</p>
              <p>{movie.duration}</p>
              <h3>✩{movie.rating}/10</h3>
            </div>
            <p>{movie.description}</p>
            {role === "user" && (
              <Link to={`/user/view/book/${movie._id}`} className="btn btn-primary">
                 {loading? <Loader size={8} color={"#fff"}/>: "Book Ticket"}
              </Link>
            )}
            {role === "admin" && (
              <>
                <Link
                  to={`/admin/edit/${movie._id}`}
                  className="btn btn-primary"
                >
                  {loading? <Loader size={8} color={"#fff"}/>: "Update"}
                </Link>{" "}
                <button type="button" className="btn btn-danger mx-1 my-1" data-bs-toggle="modal" data-bs-target="#exampleModal{{this._id}}" data-backdrop="false">
                  Delete
                </button>{" "}
                <button className="btn btn-secondary" onClick={handleDisable}> {loading? <Loader size={8} color={"#fff"}/>: "Disable"}</button>
              </>
            )}
            <div
              className="modal fade"
              id="exampleModal{{this._id}}"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel{{this._id}}"
              aria-hidden="true"
              data-backdrop="false"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 text-secondary"
                      id="exampleModalLabel{{this._id}}"
                    >
                      Delete option
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-secondary">
                    Are you sure to delete this item?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                      data-bs-dismiss="modal"
                    >
                      {loading? <Loader size={8} color={"#fff"}/>: "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* })} */}
    </>
  );
};

export default MovieView;
