import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'



//   config: {
//     useSystemColorMode: false,
//     initialColorMode: 'dark',
//   },
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      

    <ChakraProvider >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>
     
  </React.StrictMode>,
)
