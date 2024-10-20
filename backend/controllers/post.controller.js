
import {v2 as cloudinary} from "cloudinary"
import Post from "../models/post.model.js"
import path from "path"
import User from "../models/user.model.js"
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})




export const createpost= async  (req, res, next) =>{
   try{
    const {title,content} = req.body
    const author=req.id
   
   
    //If user do not upload image then => you should check if req.file is defined before trying to access its path property.
    // pahale find kro file ko 
    const whetherfileuploaded=req.file
    if(!whetherfileuploaded) return res.status(401).json({
        message: "Upload the image to your post !",
        success:false
    })

    // if user uploaded the file then access its path. Without uploading you cannot access path (agr upr wla check nhi lagaya tho undefinded milega bar bar b/c file upload hi nhi hua h isiliye)
    const file=req.file.path 

    if(!title) return res.status(401).json({
        message: "Give the title to your post !",
        success:false
    })
    if(!content) return res.status(401).json({
        message: "Write the content of your post !",
        success:false
    })


    // res.send(file)
    // function to upload file on the cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(file, { folder: 'NODesss'})
       .catch((error) => {
           console.log(error);
      });
   
// create in DB
const postauthor= await User.findById(author)

const post= await Post.create({
    title,content,
    image:cloudinaryResponse.url,
    author,
    authorname:postauthor.name
})

// send the created model to frontend to populate

if(post){
postauthor.posts.push(post._id);
await postauthor.save()

}
    return     res.status(200).json({
        message:"Post created successfully",
        success:true,
        post
    })

   }
   catch(error){
    console.log(error);
    throw error;
    
   }
  }


export const allposts= async (req,res)=>{
    try{
const allpost= await Post.find();

if(allpost){
    return res.status(200).json({
        allpost:allpost.reverse()
    })
}


    }
    catch(error){
        console.log(error);
        
    }
}
  

export const postdelete= async (req,res)=>{
    try{
const postid=req.params.id;
const logedinuser=req.id;

// deleteing the post from the user's model
const user= await User.findById(logedinuser)
user.posts=user.posts.filter((id)=>id.toString()!=postid);
await user.save()

// deleting the from the Post model
await Post.findOneAndDelete({_id:postid})
return res.status(200).json({
    message:"Post deleted successfully",
    success:true
})
    }
    catch(error){
        console.log(error);
        
    }
}
  

// export const likepost= async (req,res)=>{
//     try{
//         const loginuser=req.id;
//         const requiredpost=req.param.id;
//         const post= await Post.findById(requiredpost);
//         if(!post){
//             return res.status(401).json({
//                 message:"Post does not exists",
//                 success:false
//             })
//         }
//         post.likes.push(loginuser)
//         await post.save();
//         return res.status(200).json({
//             message:"You liked the post!!",
//             success:true
//         })



//     }
//     catch(error){
//         console.log(error);
        
//     }
// }




export const likePost = async (req, res) => {
    try {
        const loginUser = req.id; 
        const requiredPost = req.params.id; 

        const post = await Post.findById(requiredPost)
      
         

        // Check if the post was found
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }

        // If post exists, proceed to like it


        if (!post.likes.includes(loginUser)) { // Prevent duplicate likes
            post.likes.push(loginUser);
            await post.save();
        }
        
        // you can use set to store the data
        // await post.updateOne({ $addToSet: { likes: loginUser } });
        // await post.save();

        return res.status(200).json({
            message: "You liked the post!!",
            success: true,
            post,
            loginUser
          
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
            success: false
        });
    }
};



