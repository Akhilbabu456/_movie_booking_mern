import HeroSlide from "../components/HeroSlide"
import MovieCard from '../components/MovieCard'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const AdminPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const toast = useToast()
   
  useEffect(()=>{
    if(user.data.role !== "admin"){
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
    <div>
        <Header/>
        <HeroSlide/>
        <h1 className="heading mt-4">Popular movies</h1>
        <MovieCard/>
    </div>
  )
}

export default AdminPage