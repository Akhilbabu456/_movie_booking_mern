import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="229526562187-1fvd3s9m7q3eeo1ltddghppeiqkcairn.apps.googleusercontent.com">
      
    <ChakraProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
