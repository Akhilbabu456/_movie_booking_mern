
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadWidget from "../hooks/UploadWidget";
import { useToast } from "@chakra-ui/react";



const EditMovie = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
   const toast = useToast()
  const [date, setDate] = useState([])
  const{ id }= useParams();
  //const [movieDate, setMovieDate] = useState([])
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    duration: "",
    rating: "",
    link: "",
    poster: "",
    banner: "",	
    ticketPrice: "",
    dates: [],
  })
  
  
  useEffect(() => {
    if(!token){
      navigate("/")
      toast({
        title: "Unauthorized",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      })
    }else{
        const getMovieData = async () => {
            //setLoading(true)
            try {
            
              const response = await fetch(
                `https://movie-booking-mern.vercel.app/api/user/movie/${id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                  },
                }
              );
             //setLoading(false)
              let data = await response.json()
              console.log(data)
              setNewMovie(data)
            } catch (err) {
              
              console.log(err);
            }
          };
    
          getMovieData();

    const today = new Date();
    const days = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      const dd = String(newDate.getDate()).padStart(2, '0');
      const mm = String(newDate.getMonth() + 1).padStart(2, '0');
      const yyyy = newDate.getFullYear();

      days.push( `${dd}-${mm}-${yyyy}` );
    }

    setDate(days);
  }
  }, []);

  // useEffect(() => {
  //  console.log(movieDate)
  // }, [movieDate])
 
  const handlePosterUpload = async (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    
    const poster = await result.info.secure_url;
    
     setNewMovie((prevState) => ({
      ...prevState,
      poster: poster,
    }));
  };
 
  const handleBannerUpload = async (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
   
   const banner = result.info.secure_url;
   setNewMovie((prevState) => ({
    ...prevState,
    banner: banner,
  }));
  };

  const handleEditMovie = async (e) => {
    e.preventDefault();
    let response = await fetch(`https://movie-booking-mern.vercel.app/api/admin/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newMovie),
    })
      if(response.status === 500){
        toast({
          title: "Movie not added",
          status: "error",
          duration: 2500,
          isClosable: true,
        })
      }else{
        navigate("/user")
         toast({
          title: "Movie Edited successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
  }

  return (
    <>
      <div className="container1 ">
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="#"
              className="sign-in-form"
              
            >
              <h2 className="title">Add Movie</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Title"
                  value={newMovie.title}
                  onChange={(e)=>{setNewMovie({...newMovie,title: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Description"
                  value={newMovie.description}
                  onChange={(e)=>{setNewMovie({...newMovie,description: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Duration"
                  value={newMovie.duration}
                  onChange={(e)=>{setNewMovie({...newMovie,duration: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Trailer link"
                  value={newMovie.link}
                  onChange={(e)=>{setNewMovie({...newMovie,link: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Rating"
                  value={newMovie.rating}
                  onChange={(e)=>{setNewMovie({...newMovie,rating: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Ticket Price"
                  value={newMovie.ticketPrice}
                  onChange={(e)=>{setNewMovie({...newMovie,ticketPrice: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <p>Dates:</p>
                <div className="d-flex">
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[0]] }))} className="btn btn-primary p-1 me-1">{date[0]}</button>
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[1]] }))} className="btn btn-primary p-1 me-1">{date[1]}</button>
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[2]] }))} className="btn btn-primary p-1 me-1">{date[2]}</button>
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[3]] }))} className="btn btn-primary p-1 me-1">{date[3]}</button>
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[4]] }))} className="btn btn-primary p-1 me-1">{date[4]}</button>
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[5]] }))} className="btn btn-primary p-1 me-1">{date[5]}</button>
                <button onClick={() => setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[6]] }))} className="btn btn-primary p-1 me-1">{date[6]}</button>
                </div>
               
              </div>
              

              <label htmlFor="poster" style={{fontSize: "20px", fontWeight: "20px", marginTop: "16px"}}>Poster:</label>
              <UploadWidget onUpload={handlePosterUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick} id="poster" className="btn2">Upload</button>
                  );
                }}
              </UploadWidget>
             
              <label htmlFor="banner" style={{fontSize: "20px", fontWeight: "20px", marginTop: "16px"}}>Banner:</label>
              <UploadWidget onUpload={handleBannerUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick} id="banner" className="btn2">Upload</button>
                  );
                }}
              </UploadWidget>

              <button onClick={handleEditMovie} className="btn1 solid">Edit Movie </button>
              {/* //</form>onClick={handleAddMed}>{loading? <Loader size={8} color={"#fff"}/>: "Add Medicine"}
             </button> */}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Want to go Back</h3>
              <Link to="/user" className="btn btn-dark justify-content-end">
                {" "}
                Back
              </Link>
            </div>
            <img src="/add.png" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMovie;

