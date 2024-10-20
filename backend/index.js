import express, { urlencoded } from "express";
import dotenv from "dotenv"
import ConnectDB from "./utils/db.js";
import postRoute from "./routes/post.routes.js"
import userRoute from "./routes/user.routes.js"
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from 'path'

dotenv.config()
const app=express();
const PORT=process.env.PORT || 3000;


const __dirname=path.resolve();   // get the name of backend directory name


// app.use(cookieParser)
app.use(express.json())
app.use(cookieParser());
app.use(urlencoded({extended:true}))

const corsOptions={
    origin:process.env.URL,      // for the react connection we use this origin
    credentials: true
}
app.use(cors(corsOptions))
app.get("/check",(req,res)=>{
    res.send("Everythin is good")
})

app.use("/api/v1/post",postRoute);
app.use("/api/v1/user",userRoute);


app.use(express.static(path.join(__dirname,"/frontend/dist")))   // code for serve frontend from backend

app.get("*",(req,res)=>{                                         // routes ke alwa jitna bhi route hoga sab frontend ka hoga
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})

app.listen(PORT,()=>{
    ConnectDB();
    console.log(`Post run successfully at ${PORT}`);
    
})



