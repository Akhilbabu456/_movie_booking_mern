import { useEffect } from "react";
import Header from "../components/Header"
import HeroSlide from "../components/HeroSlide"
import MovieCardUser from "../components/MovieCardUser"
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";


const UserPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const toast = useToast()
   
  useEffect(()=>{
    if(user.data.role !== "user"){
      navigate("/")
      toast({
        title: "Unauthorized",
        status: "error",
        duration: 2500,
        isClosable: true,
      })
    }
  },[])
  
  return (
    <>
        <Header/>
        <HeroSlide/>
        <h1 className="heading mt-4">Popular movies</h1>
        <MovieCardUser/>
    </>
  )
}

export default UserPage