import {
 
  Button,
 
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import "../App.css"
import { HStack } from "@chakra-ui/react";
import Header from "../components/Header";



const BookingPage = ()=> {
    
   
  const [selected, setSelected] = useState(false);
  const bgColor = useColorModeValue("green.200", "green.700");

 
  return (
    <>
    <Header/>
    <div className="container1 ">
       
        <div className="forms-container">
          
          <div className="signin-signup">
            
            <form action="#" className="sign-in-form"
            //  onSubmit={handleAddMed}
             >
              <h2 className="title">Book Ticket</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="date" placeholder="Date"  
                // value={medicine.expiry_date} 
               // onChange={(e)=>{setMedicine({...medicine,expiry_date: e.target.value})}}
               />
              </div>
              <HStack>
                  <Button
                    bg={selected === 0 ? bgColor : "blue.400"}
                    color={"black"}
                    onClick={() => setSelected((prev) => (prev === 0 ? null : 0))}
                  >
                    11.30 am
                  </Button>
                  <Button
                    bg={selected === 1 ? bgColor : "blue.400"}
                    color={"black"}
                    onClick={() => setSelected((prev) => (prev === 1 ? null : 1))}
                  >
                    2.30 pm
                  </Button>
                  <Button
                    bg={selected === 2 ? bgColor : "blue.400"}
                    color={"black"}
                    onClick={() => setSelected((prev) => (prev === 2 ? null : 2))}
                  >
                    5.00 pm
                  </Button>
                  <Button
                    bg={selected === 3 ? bgColor : "blue.400"}
                    color={"black"}
                    onClick={() => setSelected((prev) => (prev === 3 ? null : 3))}
                  >
                    9.00 pm
                  </Button>
                </HStack>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="number" placeholder="No of seat" 
                // value={medicine.company} 
                // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>

              <button className="btn1 solid">
               {/* onClick={handleAddMed}{loading? <Loader size={8} color={"#fff"}/>: "Add Medicine"} */}
               Book Ticket
               </button>

            </form>

          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Want to go Back</h3>
            <Link to="/users" className="btn btn-dark justify-content-end"> Back</Link>
            </div>
            <img src="/add.png" className="image" alt="" />
          </div>

        </div>
      </div>
    </>
  );
}

export default BookingPage
               
