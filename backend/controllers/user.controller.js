import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Post from "../models/post.model.js";


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({
                message: "Fill the details",
                success: false,
            });
        }

        const userAlreadyExists = await User.findOne({ email: email });
        if (userAlreadyExists) {
            return res.status(401).json({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email,
            password: hashedPassword,
        });

        const token = await jwt.sign({ userid: user._id }, "ashish123", { expiresIn: '1d' });
        
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            message: `Welcome back ${user.name}`,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};




export const login = async (req,res)=>{
    try{
const {email,password} =req.body;
if(!email || !password){
    return res.status(401).json({
        message:"Fill the details",
        success:false
    })
  }

// lets find the user 
const loginuser= await User.findOne({email:email});
if(!loginuser) return res.status(401).json({
    message:"Incorrect email or password",
    success:false
})

const matchingPassword= await bcrypt.compare(password,loginuser.password)

if(!matchingPassword){
    return res.status(401).json({
        message:"Incorrect email or password",
        success:false
    })
}


const token= await jwt.sign({userid:loginuser._id},"ashish123",{expiresIn:'1d'})
return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({    
   message: `Welcome back ${loginuser.name}`,
    success:true,
   // user    // return the user object which contains all the informations regarding username, likes,followers..etc
}) 

    }
    catch(error){
        console.log(error);
        
    }
}


export const logout= async (req,res)=>{
    try{
        res.clearCookie('token');
      res.json({
          message:"Logged Out Successfully",
          success:true
      })
    }
    catch(error){
      console.log(error);
    }
  }


  export const profile=async (req,res)=>{
try{
    const loginuser=req.id;
    const user= await User.findById(loginuser)
    return res.status(200).json({
        user
    })
}
catch(error){
    console.log(error);
    
}
  }
 
export const userpost= async (req,res)=>{
    try{
  const loginuser = req.id;
  const allposts= await Post.find({author:loginuser})
  return res.status(200).json({
    success:true,
    allposts
  })
  

    }
    catch(error){
        console.log(error);
        
    }
}



export const showlikes= async (req,res)=>{
    const postid=req.params.id;
     
    const post= await Post.findById(postid).populate('likes');

    return res.status(200).json({
        data:post.likes
    })
    
    
}