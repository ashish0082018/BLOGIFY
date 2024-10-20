import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Showlikes = ({ onClose, title, postid }) => {
  const [showlikes, setShowlikes] = useState([]);

  const show = async (postid) => {
    try {
      const response = await axios.get(`https://blogify-h01h.onrender.com/api/v1/post/showlikes/${postid}`, {
        withCredentials: true,
      });

      setShowlikes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postid) {
      show(postid);
    }
  }, [postid]); // Adding postid as a dependency

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div className="bg-white text-gray-800 shadow-lg rounded-t-lg w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-xl mb-4">Liked by:</h2>
          <div className="space-y-2">
            {showlikes.map((elem, index) => (
              <h1 key={index} className="text-md font-medium tracking-tight hover:text-red-500 transition">
                {elem.name}
              </h1>
            ))}
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Showlikes;
