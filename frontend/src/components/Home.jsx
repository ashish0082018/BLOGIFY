import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
const [name,setname]=useState("");

  const userdetails= async ()=>{
    try{
 const response= await axios.get("http://localhost:8000/api/v1/user/profile",{
  withCredentials:true
 })
console.log(response.data.user.name);

setname(
  response.data.user.name
)
    }
    catch(error){
      console.log(error);
      
    }
  }

  useEffect(()=>{
    userdetails()
  },[])

  return (
    <>
      <div className='min-h-screen'>
        <Navbar />
     <h2 className=' font-semibold mt-2 tracking-tighter mx-5 text-xl'>Welcome back <span className='text-3xl font-bold text-red-500'> {name} </span> </h2>
        {/* MIDDLE PART */}
        <div className="w-full mt-7 p-4 sm:p-7">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* LEFT SIDE - Upload Image */}
            <div className="h-60 sm:h-80 w-full sm:w-1/2 rounded-lg p-4 flex flex-col justify-between">
              <span className="mt-5 text-5xl sm:text-6xl font-sans text-zinc-800">
               <span className='font-bold tracking-tighter hover:underline text-red-600'>Share your   </span> <br /> thoughts with
              </span>
              <span className='mt-1 text-zinc-500'>Engage with others through compelling</span>

              <Link className="bg-red-600 text-white rounded-xl px-4 py-2 mt-8 w-fit hover:bg-red-800 " to={"/create"}>
                Create Post
              </Link>
            </div>

            {/* RIGHT SIDE - Create a Post Form */}
            <div className="h-60 sm:h-80 w-full sm:w-1/2">
              <div className="flex flex-col justify-center px-4 sm:px-5 h-full  rounded-lg overflow-hidden">
                <img 
                  className='w-full h-full object-cover rounded-xl' 
                  src="https://vastphotos.com/files/uploads/photos/10556/lake-landscape-photo-m.jpg?v=20230830084557" 
                  alt="Landscape" 
                />
                
              </div>
            </div>
          </div>
        </div>

        <div className='bg-red-600 w-full h-32 text-white flex items-center justify-center mt-4 mb-0'>
          <span className='font-semibold text-md text-center'>Captivating stories shared by our vibrant community of passionate creators <br /> <span className='text-sm text-zinc-200'> who inspire each other every day</span> </span>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
