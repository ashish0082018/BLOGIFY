import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';


function Userprofile() {
const [user,setuser]=useState({
  name:"",
  email:"",
  postsCount:null
})
  const userdetails= async ()=>{
    try{
 const response= await axios.get("http://localhost:8000/api/v1/user/profile",{
  withCredentials:true
 })
console.log(response);
setuser({
  name:response.data.user.name,
  email:response.data.user.email,
  postsCount:response.data.user.posts.length
})

    }
    catch(error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    userdetails()
  }, )
  

  return (
    <>
    <Navbar/>
      <div className='flex justify-center items-center min-h-screen p-4'>
        <div className='w-full sm:w-3/4 md:w-1/2 bg-red-500 h-auto p-6 rounded-lg shadow-lg'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-white mb-4'>User Profile</h2>
          <div className='text-white'>
            <p className='text-lg sm:text-xl'><strong>Name:</strong> {user.name}</p>
            <p className='text-lg sm:text-xl'><strong>Email:</strong> {user.email}</p>
            <p className='text-lg sm:text-xl'><strong>Number of Posts:</strong> {user.postsCount}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Userprofile;
