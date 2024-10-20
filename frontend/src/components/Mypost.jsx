import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';

function Mypost({ title, content, image, authorname, postid }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/post/deletepost/${postid}`,{
        withCredentials:true
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setPopupOpen(false); // Close popup on success
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the post.");
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 h-[520px] rounded-lg border-2 shadow-lg p-2 mx-auto my-4 bg-red-100 ">
      <h4 className="font-semibold my-2 bg-red-300 p-1 w-fit rounded-xl cursor-pointer hover:bg-red-500">
        {authorname}
      </h4>
      <img className="w-full h-60 object-cover rounded-lg" src={image} alt="" />
      <span className="font-semibold mt-5 text-zinc-700 tracking-tighter block">{title}</span>
      <p className="overflow-auto w-full h-32 text-zinc-800 leading-4 mt-2">
        {content}
      </p>
      <button 
        onClick={() => setPopupOpen(true)} 
        className='bg-red-600 px-4 py-1 rounded-lg font-sans font-bold text-white'>
        Delete
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this post?</p>
            <div className="flex justify-end">
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleDelete}>
                Delete
              </button>
              <button 
                className="bg-gray-300 px-4 py-2 rounded-lg" 
                onClick={() => setPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypost;
