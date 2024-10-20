import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import axios from 'axios';


function Login() {
const navigate=useNavigate()
const [user,setuser]=useState({
  email:"",
  password:""
})


const handlelogin= async(e)=>{
  e.preventDefault()
 try{
  const response= await axios.post("http://localhost:8000/api/v1/user/login",user,{
    withCredentials: true,
  });
  if(response.data.success){
    toast.success(response.data.message)
    navigate("/")
   
    setuser({
        email:"",
  password:""
    })

  }
 }
 catch(error){
  console.log(error);
  toast.success(error.response.data.message);
  
 }
}  

  return (
   <>
   <div className='h-screen w-screen bg-red-100 flex  items-center justify-center '> 
    <form onSubmit={(e)=>handlelogin(e)} className= 'flex flex-col gap-2 bg-rose-200 py-10 px-7 rounded-lg w-96' action="">
       <span className=" mb-5  text-white rounded-xl px-2 sm:px-3 text-center font-semibold tracking-tighter text-2xl"> LOGIN </span> 
    <label className='text-lg font-semibold font-sans ' >Email </label> <input value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})} className='mb-5 outline-none px-2 py-1 rounded-xl' type="email" />
    <label className='text-lg font-semibold font-sans ' >Password </label> <input  value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} className='mb-5 outline-none px-2 py-1 rounded-xl' type="password" />
    <button className='bg-red-600 text-white rounded-lg font-semibold text-lg'>Login</button>
    <Link className=" mt-2 rounded-xl px-2 sm:px-3 hover:underline hover:text-red-800 " to={"/signup"}>  Create account </Link>
    
    </form>
   </div>
   
   </>
  )
}

export default Login