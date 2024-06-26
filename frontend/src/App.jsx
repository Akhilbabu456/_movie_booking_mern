
import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import MovieViewPage from './pages/MovieViewPage'
import BookingPage from './pages/BookingPage'
import TicketPage from './pages/TicketPage'
import MyBookingPage from './pages/MyBookingPage'
import AddMovie from './components/AddMovie'
import CollectionPage from './pages/CollectionPage'
import EditMovie from './components/EditMovie'
import AdminPage from './pages/AdminPage';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    localStorage.removeItem('chakra-ui-color-mode');
    // Set new localStorage value for dark mode
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  },[])

  return (
    <>
     <Routes>
      <Route exact path='/' element={<AuthPage/>}/>
      <Route exact path='/user' element={<UserPage/>}/>
      <Route exact path='/admin' element={<AdminPage/>}/>
      <Route exact path='/user/view/:id' element={<MovieViewPage/>}/>
      <Route exact path='/user/view/book/:id' element={<BookingPage/>}/>
      <Route exact path='/user/mybooking' element={<MyBookingPage/>}/>
      <Route exact path='/admin/add' element={<AddMovie/>}/>
      <Route exact path='/admin/edit/:id' element={<EditMovie />}/>
      <Route exact path='/admin/collection' element={<CollectionPage/>}/>
      <Route exact path='/user/view/book/ticket/:id' element={<TicketPage />}/>
      
     </Routes>
    </>
  )
}

export default App
