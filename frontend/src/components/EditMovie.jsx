
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadWidget from "../hooks/UploadWidget";
import { Button, HStack, useColorModeValue, useToast } from "@chakra-ui/react";
import Loader from "./Loader";
import "./AddMovie.css"


const EditMovie = () => {
  const user = localStorage.getItem("token")
  const token = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
   const toast = useToast()
   const [loading, setLoading] = useState(false)
   const [selected, setSelected] = useState([]);
  const bgColor = useColorModeValue("green.200", "green.500");
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
        const getMovieData = async () => {
            setLoading(true)
            try {
            
              const response = await fetch(
                `https://movie-booking-mern.vercel.app/api/user/movie/${id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user}`,
                  },
                }
              );
             setLoading(false)
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

    const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      const dd = String(newDate.getDate()).padStart(2, '0');
      const mm = monthNames[newDate.getMonth()];
      console.log(mm)

      days.push( `${dd}-${mm}` );
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
    setLoading(true)
    let response = await fetch(`https://movie-booking-mern.vercel.app/api/admin/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newMovie),
    })
    setLoading(false)
      if(response.status === 500){
        toast({
          title: "Please select date",
          status: "error",
          duration: 2500,
          isClosable: true,
        })
      }else{
        navigate("/admin")
         toast({
          title: "Movie Edited successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
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
              <h2 className="title">Edit Movie</h2>
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
              {/* <div className="input-field">
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
               
              </div> */}

                <p>Dates:</p>
{/* <HStack  m={{ base: 2, md: 3, xl: 4 }}  >
                  <Button
                width="54px"
                height="95px"
                borderRadius={"25px"}
                  bg={selected === 0 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[0]] }))
                  setSelected((prev) => (prev === 0 ? null : 0));
                }}
                  >
                    {date[0]}
                  </Button>
                  <Button
                 width="54px"
                 height="95px"
                 borderRadius={"25px"}
                  bg={selected === 1 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[1]] }))
                  setSelected((prev) => (prev === 1 ? null : 1));
                }}
                  >
                    {date[1]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected === 2 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[2]] }))
                  setSelected((prev) => (prev === 2 ? null : 2));
                }}
                  >
                    {date[2]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected === 3 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[3]] }))
                  setSelected((prev) => (prev === 3 ? null : 3));
                }}
                  >
                    {date[3]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected === 4 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[4]] }))
                  setSelected((prev) => (prev === 4 ? null : 4));
                }}
                  >
                    {date[4]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected === 5 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[5]] }))
                  setSelected((prev) => (prev === 5 ? null : 5));
                }}
                  >
                    {date[5]}
                  </Button>
                  <Button
                  width="54px"
                  height="95px"
                  borderRadius={"25px"}
                  bg={selected === 6 ? bgColor : "#5188ff"}
                  color={"white"}
                  onClick={() =>{ setNewMovie(prevState => ({ ...prevState, dates: [...prevState.dates, date[6]] }))
                  setSelected((prev) => (prev === 6 ? null : 6));
                }}
                  >
                    {date[6]}
                  </Button>
                </HStack> */}

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

              <button onClick={handleEditMovie} className="btn1 solid">
              {loading? <Loader size={8} color={"#fff"}/>: "Edit Movie"}
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

export default EditMovie;

