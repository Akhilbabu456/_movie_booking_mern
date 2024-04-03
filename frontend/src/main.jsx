import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { NextUIProvider } from '@nextui-org/react'

// const customTheme = {
//   styles: {
//     global: {
//       body: {
//         bg: "dark.800", // Set your desired background color here
//       },
//     },
//   },
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <NextUIProvider>

    <ChakraProvider >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>
      </NextUIProvider>
   
  </React.StrictMode>,
)
