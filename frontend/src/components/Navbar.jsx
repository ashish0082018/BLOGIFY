import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Navbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center px-4 py-2 sm:px-7 text-lg bg-red-200 shadow  ">
        <Link className="font-semibold tracking-tighter text-xl cursor:pointer hover:text-red-600 bg-red-400 px-4 py-1 rounded-full " to={"/"}>BLOGIFY</Link>
        
        <button 
          className="sm:hidden p-2"
          onClick={() => setShow(!show)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`flex flex-col sm:flex-row text-md gap-3 items-center font-semibold ${show ? 'block' : 'hidden'} sm:block`}>
          <Link className="bg-red-600 text-white rounded-xl px-2 mx-2 sm:px-3 hover:bg-red-800 " to={"/allposts"}>Explore</Link>
          <Link className="bg-red-600 text-white rounded-xl px-2 mx-2 sm:px-3 hover:bg-red-800 "  to={"/create"}>Create</Link>

          <Link className="bg-red-600 text-white rounded-xl px-2 mx-2 sm:px-3 hover:bg-red-800 " to={"/userpost"}>Your posts</Link>
          <Link className="bg-red-600 text-white rounded-xl px-2 mx-2 sm:px-3 hover:bg-red-800 " to={"/userprofile"}>Your Profile</Link>
          <Link onClick={handleLogout} className="bg-red-600 text-white rounded-xl px-2 sm:px-3 hover:bg-red-800 ">Login/Logout</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
