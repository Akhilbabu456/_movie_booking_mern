import { useState } from "react"
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"


const LoginCard = () => {
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState("")
    const [ authScreen,setAuthScreen] = useState("login")
    const [signUp, setSignUp] = useState({
       name: "",
       email: "",
       password: "",
       confirmPassword: "",
    })
    const [login, setLogin] = useState({
      email: "",
      password: "",
    })
   const navigate = useNavigate()
   const toast = useToast()

   const handleSignUp = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const url = "https://movie-booking-mern.vercel.app/api/user/signup"
      const res = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      })
      let data = await res.json()
      setId(data.token)
      console.log(data)

      if(res.status === 200){
        setLoading(true)
        toast({
          title: "Verification email send please verify",
          description: "Link expires in 30sec",
          status: "success",
          duration: 2500,
          isClosable: true,
        })
      }else{
        setLoading(false)
        if(data.errors.name || data.errors.email || data.errors.password || data.errors.password_confirmation){
          toast({
            title: `${data.errors.name || data.errors.email || data.errors.password || data.errors.password_confirmation}` ,
            status: "error",
            duration: 2500,
            isClosable: true,
          })
        }
       
      }

      setTimeout(async()=>{
        console.log(id)
        const response = await fetch(`https://movie-booking-mern.vercel.app/api/user/verify/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        if(response.status === 200){
          setLoading(false)
          setAuthScreen("login")
          toast({
            title: "Account created successfully",
            description: "Please login",
            status: "success",
            duration: 2500,
            isClosable: true,
          })
        }else{
          setLoading(false)
          toast({
            title: "Account not created please try again",
            status: "error",
            duration: 2500,
            isClosable: true,
          })
        }
      },35000)
    }catch(err){
      console.log(err)
    
       
      
    }
   }

   const handleLogin = async(e)=>{
    e.preventDefault()
    setLoading(true)
  try{
    const url = "https://movie-booking-mern.vercel.app/api/user/login"
    const res = await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
    let data = await res.json()
   if(!res.error){
    setLoading(false)
     localStorage.setItem("token", `Bearer ${data.token}`)
     localStorage.setItem("user", JSON.stringify(data))
    navigate("/user")
    toast({
      title: "Logged in successfully",
      status: "success",
      duration: 2500,
      isClosable: true,
    })
   }else{
    setLoading(false)
    console.log(data)
          toast({
            title: data.errors,
            status: "error",
            duration: 2500,
            isClosable: true,
          })
   } 
  }catch(err){
    console.log(err)
  }
      
   }
  
  

  return (
    <>
        <div className={authScreen==="login" ? "container1 ":"container1 sign-up-mode" }>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email" value={login.email} 
              onChange={(e)=>setLogin({...login,email:e.target.value})} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={login.password} 
              onChange={(e)=>setLogin({...login,password:e.target.value})}/>
            </div>
            <button className="btn1 solid" 
            onClick={handleLogin}
            >{loading? <Loader size={8} color={"#fff"}/>: "Login"}</button>
            
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={signUp.name} 
              onChange={(e)=>setSignUp({...signUp,name:e.target.value})}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={signUp.email} 
              onChange={(e)=>setSignUp({...signUp,email:e.target.value})} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={signUp.password} 
              onChange={(e)=>setSignUp({...signUp,password:e.target.value})}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" value={signUp.password_confirmation} 
              onChange={(e)=>setSignUp({...signUp,confirmPassword:e.target.value})}/>
            </div>
            <button  className="btn1"  
            onClick={handleSignUp}
            >{loading? <Loader size={8} color={"#fff"}/>: "SignUp"}</button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <button className="btn transparent" id="sign-up-btn"
            onClick={()=>{
              setAuthScreen("signup")
            }}
            >
              Sign up
            </button>
          </div>
          <img src="/login.png" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already a user?</h3>
            <button className="btn transparent" id="sign-in-btn"
            onClick={()=>{
              setAuthScreen("login")
            }}
            >
              Sign in
            </button>
          </div>
          <img src="/register.png" className="image" alt="" />
        </div>
      </div>
    </div>

    </>
  )
}

export default LoginCard