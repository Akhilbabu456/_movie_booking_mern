
import { Route, Routes } from 'react-router-dom'
import './App.css'

import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import MovieViewPage from './pages/MovieViewPage'
import BookingPage from './pages/BookingPage'
import TicketPage from './pages/TicketPage'
import MyBookingPage from './pages/MyBookingPage'
import AddMovie from './components/AddMovie'
import CollectionPage from './pages/CollectionPage'
import EditMovie from './components/EditMovie'

function App() {
 

  return (
    <>
     <Routes>
      <Route exact path='/' element={<AuthPage/>}/>
      <Route exact path='/user' element={<UserPage/>}/>
      <Route exact path='/user/view/:id' element={<MovieViewPage/>}/>
      <Route exact path='/user/view/book/:id' element={<BookingPage/>}/>
      <Route exact path='/user/mybooking' element={<MyBookingPage/>}/>
      <Route exact path='/admin/add' element={<AddMovie/>}/>
      <Route exact path='/admin/edit/:id' element={<EditMovie />}/>
      <Route exact path='/admin/collection' element={<CollectionPage/>}/>
      <Route exact path='/user/view/book/:id' element={<TicketPage bookingId="12345"
  numberOfSeats="2"
  name="John Doe"/>}/>
      
     </Routes>
    </>
  )
}

export default App
