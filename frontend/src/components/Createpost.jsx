import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from 'axios';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function Createpost() {
  const navigate = useNavigate(); // Use the hook
  // Storing all the details  of the post
  const [postdata, setpostdata] = useState({
    title: "",
    content: "",
    image: null,
  });

  // Fetching the name of the user who create the post
  const [name,setname]=useState("");


  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const [loading, setLoading] = useState(false); // New state for loading

  const handlesubmit = async (e) => {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append('title', postdata.title);
    formData.append('content', postdata.content);
    formData.append('image', postdata.image);

    setLoading(true); // Set loading to true

    try {
      const response = await axios.post("http://localhost:8000/api/v1/post/createpost", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials:true
      });
      
      if (response.data.success) {
        
        toast.success(response.data.message);
        navigate("/allposts");
        setpostdata({
          title: "",
          content: "",
          image: null,
        });

        setImagePreview(null); // Reset preview after submission
        
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const uploadhandler = (e) => {
    const getUploadFileDetails = e.target.files[0];
    if (!getUploadFileDetails) return;

    setpostdata({
      ...postdata,
      image: getUploadFileDetails,
    });

    // Create a preview URL
    const previewUrl = URL.createObjectURL(getUploadFileDetails);
    setImagePreview(previewUrl); // Set the preview URL
    
  };


// const getLoginUserName= async ()=>{
//   try{
// const response= await axios.get("http://localhost:8000/api/v1/user/profile",{
//   withCredentials:true
// })
// setname(response.data.user.name)
//   }
//   catch(error){
//     console.log(error);
    
//   }
// }



  return (
    <>
      
      <div className="w-screen min-h-screen flex flex-col">
        <Navbar />
        <div className="w-full min-h-screen mt-7 p-4 sm:p-7 flex justify-center items-center">
          <form onSubmit={handlesubmit} className="flex flex-col sm:flex-row gap-4">
            {/* LEFT SIDE - Upload Image */}
            <div className="h-60 sm:h-80 w-full sm:w-1/2 border-2 rounded-lg p-2 shadow-xl flex flex-col items-center">
              <span className="mt-5 text-xl font-bold tracking-tighter text-zinc-800">Upload Image</span>
              <div className="flex flex-col items-center justify-center w-full h-full">
                {imagePreview ? (
                  <img
                    className="w-1/3 rounded-lg mb-4"
                    src={imagePreview} // Use the preview URL
                    alt="Preview"
                  />
                ) : (
                  <img
                    className="w-1/5 rounded-full"
                    src="https://img.freepik.com/free-vector/speech-bubble-3d-icon-message-concept-realistic-speech-bubble-plus-chat-vector-message-box_90220-974.jpg?t=st=1729228048~exp=1729231648~hmac=2c1495bd68668b1ad56fb7e6ae6a331c83a786a0af989d0a094ea46e8a924161&w=740"
                    alt="Placeholder"
                  />
                )}
                <div className="flex items-center">
                  <input onChange={uploadhandler} type="file" id="file-upload" className="hidden" />
                  <label htmlFor="file-upload" className="cursor-pointer bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600">
                    Choose a file
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Create a Post Form */}
            <div className="h-60 sm:h-80 w-full sm:w-1/2">
              <div className="flex flex-col justify-center px-4 sm:px-5 h-full border-2 shadow-2xl rounded-lg">
                <span className="text-2xl font-bold tracking-tighter text-zinc-800">Create a post</span>
                <h3 className="font-semibold text-zinc-800 mt-2">Title</h3>
                <input 
                  value={postdata.title} 
                  onChange={(e) => setpostdata({ ...postdata, title: e.target.value })} 
                  className="rounded-lg outline-none border-2 px-2 shadow-sm" 
                  type="text" 
                />
                <h3 className="font-semibold text-zinc-800 mt-3">Content</h3>
                <div className="rounded-xl overflow-hidden">
                  <textarea 
                    value={postdata.content} 
                    onChange={(e) => setpostdata({ ...postdata, content: e.target.value })} 
                    className="w-full h-40 outline-none resize-none overflow-auto px-2 py-2 leading-4 tracking-tight text-md font-sans font-medium rounded-xl border-2 shadow-sm">
                  </textarea>
                </div>
                <button 
                  type="submit" 
                  className={`bg-red-600 hover:bg-red-700 rounded-lg mt-2 font-semibold text-white tracking-tighter mb-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Publishing..." : "Publish Now"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Createpost;
