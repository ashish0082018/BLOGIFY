import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

function Readmore() {
  const [postdata, setpostdata] = useState({
    image: "",
    title: "",
    content: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const postid = params.id;

  useEffect(() => {
    readmore();
  }, []);

  const readmore = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/post/readmore/${postid}`);
      const { image, title, content } = response.data.post;
      setpostdata({ image, title, content });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen w-screen bg-red-100 flex justify-center items-center py-20'>
        <div className='min-h-[500px] w-full max-w-md bg-red-200 rounded-xl flex flex-col p-5 border shadow-xl'>
          <img
            className='w-full h-[300px] object-cover hover:scale-105 transition duration-300 rounded-2xl border border-black cursor-pointer'
            src={postdata.image}
            alt=""
            onClick={() => setIsModalOpen(true)} // Open modal on click
          />
          <h2 className='font-bold text-xl mt-4 font-sans text-zinc-800 tracking-tighter hover:bg-red-500 transition w-fit px-3 rounded-full'>{postdata.title}</h2>
          <p className='leading-5 text-base tracking-tighter'>{postdata.content}</p>
          <Link className='bg-red-500 rounded-2xl px-3 w-fit mt-5 text-white font-semibold text-lg' to="/allposts">Back</Link>
        </div>
      </div>

      {/* Modal for full image */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70' onClick={() => setIsModalOpen(false)}>
          <div className='bg-white p-4 rounded' onClick={(e) => e.stopPropagation()}>
            <img src={postdata.image} alt="Full View" className='max-w-full max-h-[80vh]' />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Readmore;
