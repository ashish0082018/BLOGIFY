import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const isauthenticated= async (req,res,next)=>{
    try{
    const token=req.cookies.token
    if(!token) return res.status(401).json({
        message:"Please Login Yourself..!!",
        success:false
    })

    const decode = await jwt.verify(token,"ashish123");
    if(!decode){
        return res.status(401).json({
            message:"Invalid",
            success:false
        })
    }
req.id=decode.userid
// return res.send(req.id)
// const user= await User.findById(decode.userid)
// req.details= user


next();

    }
    catch(error){
        console.log(error);
        
    }
}
export  default isauthenticated