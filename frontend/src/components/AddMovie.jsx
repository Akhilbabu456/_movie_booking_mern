
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadWidget from "../hooks/UploadWidget";
import { Button, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import Loader from "./Loader";



const AddMovie = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
   const toast = useToast()
   const [loading, setLoading] = useState(false)
  const [date, setDate] = useState([])
  const [selected, setSelected] = useState(null);
  const bgColor = useColorModeValue("green.200", "green.700");
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

  const handleAddMovie = async (e) => {
    setLoading(true)
    e.preventDefault();
    let response = await fetch("https://movie-booking-mern.vercel.app/api/admin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newMovie),
    })
    const data = response.json() 
    setLoading(false)
    if(response.status === 400) {
      
        toast({
          title: "All fields are required",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      
     
    } else if(response.status === 500) {
      toast({
        title: data.error,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } else {
      navigate("/admin")
      toast({
        title: "Movie added successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
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
                  name= "title"
                  onChange={(e)=>{setNewMovie({...newMovie,title: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newMovie.description}
                  onChange={(e)=>{setNewMovie({...newMovie,description: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  value={newMovie.duration}
                  onChange={(e)=>{setNewMovie({...newMovie,duration: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="link"
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
                  name="rating"
                  value={newMovie.rating}
                  onChange={(e)=>{setNewMovie({...newMovie,rating: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  name="ticketPrice"
                  placeholder="Ticket Price"
                  value={newMovie.ticketPrice}
                  onChange={(e)=>{setNewMovie({...newMovie,ticketPrice: e.target.value})}}
                />
              </div>
              <Stack  m={{ base: 2, md: 3, xl: 4 }}  display={{base: "flex", sm:"flex", md: "block", xl: "flex", "2xl": "block",}}>
                <p>Dates:</p>
                  <Button
                 m={1}
                  bg={selected === 0 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[0]] }))
                  setSelected((prev) => (prev === 0 ? null : 0));
                }}
                  >
                    {date[0]}
                  </Button>
                  <Button
                 m={1}
                  bg={selected === 1 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[1]] }))
                  setSelected((prev) => (prev === 1 ? null : 1));
                }}
                  >
                    {date[1]}
                  </Button>
                  <Button
                 m={1}
                  bg={selected === 2 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[2]] }))
                  setSelected((prev) => (prev === 2 ? null : 2));
                }}
                  >
                    {date[2]}
                  </Button>
                  <Button
                 m={1}
                  bg={selected === 3 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[3]] }))
                  setSelected((prev) => (prev === 3 ? null : 3));
                }}
                  >
                    {date[3]}
                  </Button>
                  <Button
                 m={1}
                  bg={selected === 4 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[4]] }))
                  setSelected((prev) => (prev === 4 ? null : 4));
                }}
                  >
                    {date[4]}
                  </Button>
                  <Button
                 m={1}
                  bg={selected === 5 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[5]] }))
                  setSelected((prev) => (prev === 5 ? null : 5));
                }}
                  >
                    {date[5]}
                  </Button>
                  <Button
                 m={1}
                  bg={selected === 6 ? bgColor : "blue.400"}
                  color={"black"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[6]] }))
                  setSelected((prev) => (prev === 6 ? null : 6));
                }}
                  >
                    {date[6]}
                  </Button>
                </Stack>
            
              

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

              <button onClick={handleAddMovie} className="btn1 solid"> 
              {loading? <Loader size={8} color={"#fff"}/>: "Add Movie"}
             </button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Want to go Back</h3>
              <Link to="/admin" className="btn btn-dark justify-content-end">
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

export default AddMovie;

