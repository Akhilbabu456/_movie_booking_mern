
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadWidget from "../hooks/UploadWidget";
import { Button, HStack, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import Loader from "./Loader";
import "./AddMovie.css"



const AddMovie = () => {
  const token = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
   const toast = useToast()
   const [loading, setLoading] = useState(false)
  const [date, setDate] = useState([])
  const [selected, setSelected] = useState([]);
  const bgColor = useColorModeValue("green.200", "green.500");
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
    if(token.data.role !== "admin"){
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
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      const dd = String(newDate.getDate()).padStart(2, '0');
      const mm = monthNames[newDate.getMonth()];
      
      let value = `${dd}-${mm}`
      days.push( value );
    }
    days.forEach(date => console.log(date))
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
    if (newMovie.dates.length === 0 || !newMovie.poster || !newMovie.banner) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      setLoading(false)
      return;
    }
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

  const handleButtonClick = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  return (
    <>
      <div className="container1 ">
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="#"
              className="sign-in-form1"
              
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
                <p>Dates:</p>
              <HStack  m={{ base: 2, md: 3, xl: 4 }}  >
                  <Button
                  width="54px"
                  height="95px"
                  
                  borderRadius={"25px"}
                  bg={selected.includes(0) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[0]] }))
                  handleButtonClick(0)
                }}
                  >
                    {date[0]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected.includes(1) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[1]] }))
                  handleButtonClick(1)
                }}
                  >
                    {date[1]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected.includes(2) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[2]] }))
                  handleButtonClick(2)
                }}
                  >
                    {date[2]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected.includes(3) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[3]] }))
                  handleButtonClick(3)
                }}
                  >
                    {date[3]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected.includes(4) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[4]] }))
                  handleButtonClick(4)
                }}
                  >
                    {date[4]}
                  </Button>
                  <Button
                 width="54px"
                 height="95px"
                 borderRadius={"25px"}
                  bg={selected.includes(5) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[5]] }))
                  handleButtonClick(5)
                }}
                  >
                    {date[5]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected.includes(6) ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[6]] }))
                  handleButtonClick(6)
                }}
                  >
                    {date[6]}
                  </Button>
                </HStack>
            
              

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
            <img src="/film.png" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovie;

