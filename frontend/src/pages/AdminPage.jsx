import HeroSlide from "../components/HeroSlide"
import MovieCard from '../components/MovieCard'
import Header from '../components/Header'

const AdminPage = () => {
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