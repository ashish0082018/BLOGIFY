import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Post from './Post';
import axios from 'axios';
import Mypost from './Mypost';

function Userposts() {
const [data,setdata]=useState([])

const fetchLoginUserPost= async ()=>{
    try{
    const response= await axios.get("https://blogify-h01h.onrender.com/api/v1/user/userpost",{
        withCredentials:true
    });
    if(response.data.success){
    //console.log(response.data.allposts);
    setdata(response.data.allposts)
    }
    }
    catch(error){
        console.log(error);
        
    }
}

useEffect(() => {
    fetchLoginUserPost()
} )

    
  return (

    <>
        <Navbar/>
         
        <div className='min-h-screen border border-t-2  shadow-xl flex flex-wrap flex-col gap-8 justify-center bg-gradient-to-r from-red-800 to-red-200  '>
        {
            data.map((elem)=>{
                return <Mypost title={elem.title} content={elem.content} image={elem.image} authorname={"You"} postid={elem._id} />
            })
        }

        </div>
        <Footer/>
    </>

  )
}

export default Userposts