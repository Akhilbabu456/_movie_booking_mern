import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Upload from "rc-upload";
import { useState } from "react";
import UploadWidget from "../hooks/UploadWidget";

const AddMovie = () => {
  // const [url, setUrl] = useState("");
  let poster = "";
  let banner = ""

  const handlePosterUpload = async (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    //console.log(result.info.secure_url)
    //await setUrl(result.info.secure_url);
    poster = result.info.secure_url;
    console.log(poster);
  };
  const handleBannerUpload = async (error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    //console.log(result.info.secure_url)
    //await setUrl(result.info.secure_url);
    banner = result.info.secure_url;
    console.log(banner);
  };

  return (
    <>
      <div className="container1 ">
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="#"
              className="sign-in-form"
              //</div>onSubmit={handleAddMed}
            >
              <h2 className="title">Add Movie</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Title"
                  //value={medicine.name}
                  // onChange={(e)=>{setMedicine({...medicine,name: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Description"
                  //value={medicine.company}
                  // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Duration"
                  //value={medicine.company}
                  // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Trailer link"
                  //value={medicine.company}
                  // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Rating"
                  //value={medicine.company}
                  // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Ticket Price"
                  //value={medicine.company}
                  // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="number"
                  placeholder="Total seats"
                  //value={medicine.company}
                  // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
                />
              </div>
              

              <label htmlFor="poster" style={{fontSize: "20px", fontWeight: "20px", marginTop: "16px"}}>Poster:</label>
              <UploadWidget onUpload={handlePosterUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick} id="poster" className="btn2">Upload</button>
                  );
                }}
              </UploadWidget>
             
              <label htmlFor="banner" style={{fontSize: "20px", fontWeight: "20px", marginTop: "16px"}}>Banner:</label>
              <UploadWidget onUpload={handleBannerUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick} id="banner" className="btn2">Upload</button>
                  );
                }}
              </UploadWidget>

              <button className="btn1 solid">Add Movie </button>
              {/* //</form>onClick={handleAddMed}>{loading? <Loader size={8} color={"#fff"}/>: "Add Medicine"}
             </button> */}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Want to go Back</h3>
              <Link to="/user" className="btn btn-dark justify-content-end">
                {" "}
                Back
              </Link>
            </div>
            <img src="/add.png" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovie;
