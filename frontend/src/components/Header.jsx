//import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function Header() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  let toast = useToast()
  let user = localStorage.getItem("token");
  let detail = JSON.parse(localStorage.getItem("user"));
  const [role, setRole] = useState("");
  // setRole(detail.data.role)
  useEffect(() => {
    setRole(detail?.data?.role || "");
  }, [detail]);

    const handleLogout = async()=>{
        navigate("/")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast({
          title: "Logout Successfully",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }
    

  return (
    <>
      <nav
        className="navbar navbar-no-border navbar-expand-lg border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/user">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/user"
                  hidden
                >
                  Home
                </Link>
              </li>
            </ul>

            <Link className="text-white mx-3" to="/user">
              Home
            </Link>
            {role === "user" && <Link className="text-white mx-3" to="/user/mybooking">
              My Booking
            </Link>}
            {role === "admin" && 
             <>
             <Link className="text-white mx-3" to="/admin/add">Add Movie</Link>
             <Link className="text-white mx-3" to="/admin/collection">Collection</Link>
             </>
             }

            <br />

            <div className="dropdown-center mx-3">
              <button
                className="btn btn-secondary text-light"
                type="button"
                 onClick={handleLogout}
              >
                {loading ? <Loader size={5} color={"#fff"} /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
