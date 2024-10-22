import React from 'react'
import { Link } from 'react-router-dom'

function Skeleton() {
const arr=[1,2,4,5,6,7,8]
  return (
    <>
   {
    arr.map((elem)=>{
        return  <div className="w-full sm:w-1/2 md:w-1/3 h-[550px] rounded-lg border-2 shadow-lg p-2 py-1 mx-auto my-4 bg-zinc-100">
        <h4 className="font-semibold my-2 bg-zinc-200 p-1 w-fit rounded-xl cursor-pointer">
         
        </h4>
        <div className="flex flex-col">
          <img
            className="w-full h-64 object-cover rounded-lg border border-black shadow-lg  bg-zinc-500"
           
         
          />
          <span className="p-2 mt-2">
            
            <div
             
              className="text-sm hover:underline cursor-pointer"
            >
            
            </div>
          </span>
        </div>
        <span className="font-bold text-zinc-700 tracking-tighter block  bg-zinc-400"></span>
        <p className=" w-full h-20 overflow-hidden text-zinc-800 leading-4 mt-2  bg-zinc-400">
      
        </p>  <Link className='ml-5 bg-zinc-400'>....read more </Link> 
        
     
  
        
      </div>
    })
   } 
   
    </>
  )
}

export default Skeleton