import mongoose from "mongoose";



const ConnectDB= async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
        
    }
    catch(error){
        console.log(error);
        throw error
    }
}

export default ConnectDB;