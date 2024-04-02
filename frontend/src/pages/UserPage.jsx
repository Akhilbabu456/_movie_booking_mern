import Header from "../components/Header"
import HeroSlide from "../components/HeroSlide"
import MovieCardUser from "../components/MovieCardUser"


const UserPage = () => {
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