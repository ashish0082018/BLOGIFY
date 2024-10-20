import React from 'react';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

function Footer() {
  return (
    <div className="w-full bg-red-200 shadow-md border-t-2 py-4  ">
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 leading-3">
        <div className="flex flex-col leading-tight mb-4 sm:mb-0">
          <h3 className="font-bold tracking-tighter text-lg">BLOGIFY</h3>
          <p className="text-sm font-semibold">Platform for sharing stories and ideas</p>
          <span className="mt-2">Contact Us</span>
          <div className="flex gap-2 mt-1">
          <Link to={"https://www.linkedin.com/in/ashish-verma-16b525238?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}> <i className="ri-linkedin-fill cursor-pointer"></i> </Link>
            <i className="ri-instagram-fill cursor-pointer"></i>
           
            <i className="ri-twitter-x-line cursor-pointer"></i>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 sm:gap-14">
          <div className="flex flex-col">
            <h2 className="font-semibold text-zinc-800 mb-3">New Post</h2>
            <h4 className="text-sm font-semibold">Search</h4>
            <h4 className="text-sm font-semibold">Connect</h4>
            <h4 className="text-sm font-semibold">Business</h4>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-zinc-800 mb-3">Read Post</h2>
            <h4 className="text-sm font-semibold">Profile View</h4>
            <h4 className="text-sm font-semibold">Comparison</h4>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-zinc-800 mb-3">Your Posts</h2>
            <h4 className="text-sm font-semibold">About you</h4>
            <h4 className="text-sm font-semibold">Opportunity</h4>
            <h4 className="text-sm font-semibold">Contact us</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
