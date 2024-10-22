import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Post from './Post';
import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

function Allposts() {

const [post,setpost]=useState([])
const [loading,setloading]=useState(true);

const allposts= async ()=>{
  const response=await axios.get("http://localhost:8000/api/v1/post/allposts");
  const data= response.data.allpost;
  setpost(data)
  setloading(false)
}



useEffect(() => {
allposts()
},[])




  return loading ?  <Skeleton/> : (
    <div className="flex flex-col min-h-screen  ">
      <Navbar />
      <hr className='' />
      <div className="flex-grow w-screen flex flex-wrap gap-20 px-10 py-10  flex-col justify-center items-center bg-gradient-to-r from-red-800 to-red-200 ">
      
     {
      post.map((elem)=>{
       return <Post title={elem.title} content={elem.content} image={elem.image} authorname={elem.authorname} postid={elem._id} likes={elem.likes.length} />
      })
     }






      </div>

      <Footer />
    </div>
  );
}

export default Allposts;
