import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function Signup() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signup", user, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
        setuser({
          name: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='h-screen w-screen bg-red-100 flex items-center justify-center'>
      <form onSubmit={(e) => handlesubmit(e)} className='flex flex-col gap-2 bg-rose-200 py-10 px-7 rounded-lg w-96'>
        <span className="mb-5 text-white rounded-xl px-2 sm:px-3 text-center font-semibold tracking-tighter text-2xl">SIGNUP</span>
        <label className='text-lg font-semibold font-sans'>Name</label>
        <input value={user.name} onChange={(e) => setuser({ ...user, name: e.target.value })} className='mb-5 outline-none px-2 py-1 rounded-xl' type="text" />
        <label className='text-lg font-semibold font-sans'>Email</label>
        <input value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} className='mb-5 outline-none px-2 py-1 rounded-xl' type="email" />
        <label className='text-lg font-semibold font-sans'>Password</label>
        <input value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} className='mb-5 outline-none px-2 py-1 rounded-xl' type="password" />
        <button className='bg-red-600 text-white rounded-lg font-semibold text-lg'>Signup</button>
        <Link className="mt-2 rounded-xl px-2 sm:px-3 hover:underline hover:text-red-800" to={"/login"}>Login</Link>
      </form>
    </div>
  );
}

export default Signup;
