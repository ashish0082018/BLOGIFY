import mongoose, { mongo }  from "mongoose";
import Post from "./post.model.js";

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String, required:true},
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]


})

const User= mongoose.model("User",userSchema);
export default User;