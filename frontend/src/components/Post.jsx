import axios from 'axios';
import React, { useState } from 'react';
import Showlikes from './Showlikes';
import Readmore from './Readmore';
import { Link } from 'react-router-dom';

function Post({ title, content, image, authorname, postid, likes }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes);
  const [showLikesDrawer, setShowLikesDrawer] = useState(false); // State to manage drawer visibility

  const handleLike = async (postid) => {
    setIsLike(true);
    const response = await axios.get(`http://localhost:8000/api/v1/post/likepost/${postid}`, {
      withCredentials: true,
    });
   

    setCount(response.data.post.likes.length);
  };

  const handleClick = () => {
    setShowLikesDrawer(true); // Open the Showlikes component
  };

  const closeDrawer = () => {
    setShowLikesDrawer(false); // Close the Showlikes component
  };



  return (
    <div className="w-full sm:w-1/2 md:w-1/3 h-[550px] rounded-lg border-2 shadow-lg p-2 py-1 mx-auto my-4 bg-red-100">
      <h4 className="font-semibold my-2 bg-red-300 p-1 w-fit rounded-xl cursor-pointer hover:bg-red-500">
        {authorname}
      </h4>
      <div className="flex flex-col">
        <img
          className="w-full h-64 object-cover rounded-lg border border-black shadow-lg"
          src={image}
          alt=""
        />
        <span className="p-2 mt-2">
          <i
            onClick={() => handleLike(postid)}
            className={`ri-heart-fill text-2xl ${isLike ? `text-red-600` : `text-zinc-600`}`}
          ></i>
          {count} Like
          <div
            onClick={handleClick}
            className="text-sm hover:underline cursor-pointer"
          >
            See likes
          </div>
        </span>
      </div>
      <span className="font-bold text-zinc-700 tracking-tighter block">{title}</span>
      <p className=" w-full h-20 overflow-hidden text-zinc-800 leading-4 mt-2">{content}
    
      </p>  <Link className='ml-5' to={`/readmore/${ postid}`}>....read more </Link> 
      
   
      {/* Conditional rendering of the Showlikes component */}
      {showLikesDrawer && (
        <Showlikes onClose={closeDrawer} title={title} postid={postid} />
      )}
      
    </div>
    
  );
}

export default Post;
