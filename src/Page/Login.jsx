import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  // const {login, user, googleSignIn } = useContext(AuthContext)
  const {register,  handleSubmit} = useForm()

  const [user, setUser] = useState([]);
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/photos')
  //     .then((res) =>res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // setPhotos(data);
  //     });
  // }, []);



  // const location = useLocation()
  // const navigate = useNavigate()

  // const form = location.state?.from?.pathname || "/"

  // if(user) navigate(form)
  const onSubmit = async d => {
    console.log(d)
    try {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: d.email, password: d.password })
      })
      .then(res=>res.json())
      .then(data=>console.log(data))     
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const fetchAuthUser = async () =>{
    const  response = await axios
    .get("http://localhost:5000/api/v1/auth/user", {withCredentials: true})
    .catch(err=> {
      console.log(err)
      console.log("error", "not properly authenticate")
    })
 
    if(response && response.data){
      console.log(response.data)
    }
    // fetch("http://localhost:5000/api/v1/auth/user")
    // .then(res=>res.json())
    // .then(data=>console.log(data))
    // .catch(err=> console.log(err))
  }


  const redirectToGoogle = async () =>{

    let timer = null;
    const googleLoginUrl = "http://localhost:5000/api/v1/login/google";
    const newWindow = window.open(
      googleLoginUrl,
      "_target",
      "width=500,height=600"
    )
    if (newWindow) {
      timer = setInterval(() => {
        if(newWindow.closed){
        console.log("yea we're authenticate");
        fetchAuthUser()
          if (timer) {
              clearInterval(timer);
          }
        } 
      }, 500);
  }
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/243/021/small/abstract-template-background-white-and-bright-blue-squares-overlapping-with-halftone-and-texture-free-vector.jpg')] bg-no-repeat bg-cover bg-center ">
  <div className="md:w-[450px] w-full bg-white p-5 ">
    <h1 className="text-center font-bld text-2xl text-black font-light py-2">
      Log In
    </h1>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="font-semibold ">
          Email
        </label>
        <input
        {...register("email", {required: true})}
          type="text"
          placeholder="email"
          className="w-full py-1.5 px-2 bg-slate-300 mt-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="font-semibold ">
          Password
        </label>
        <input
        {...register("password", {required: true})}
          type="password"
          placeholder="password"
          className="w-full py-1.5 px-2 bg-slate-300 mt-2"
        />
      </div>
      <button className="w-full px-5 py-2.5 bg-blue-600 text-white mt-8">
        Login
      </button>
    </form>
    <p className='text-center mt-2'>Don't have an account? <a href="/signup" className='text-blue-500 font-semibold'>Sign Up</a></p>
    <div className='flex items-center justify-center gap-5 mt-2'>
      <hr className='h-1 bg-slate-600 w-1/3' />
      <span>or</span>
      <hr className='h-1 bg-slate-600 w-1/3' />
    </div>
    <div onClick={redirectToGoogle} className="flex cursor-pointer items-center justify-center gap-3 text-xl mt-2 border border-slate-300 py-1.5">
      <FcGoogle className='text-2xl' /> <p>Google</p>
    </div>
  </div>
  
</div>
  )
}

export default Login