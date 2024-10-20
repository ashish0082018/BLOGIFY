import express, { urlencoded } from "express";
import dotenv from "dotenv"
import ConnectDB from "./utils/db.js";
import postRoute from "./routes/post.routes.js"
import userRoute from "./routes/user.routes.js"
import cors from 'cors'
import cookieParser from "cookie-parser";

dotenv.config()
const app=express();
const PORT=process.env.PORT || 3000;
// app.use(cookieParser)
app.use(express.json())
app.use(cookieParser());
app.use(urlencoded({extended:true}))

const corsOptions={
    origin:'http://localhost:5173',      // for the react connection we use this origin
    credentials: true
}
app.use(cors(corsOptions))
app.get("/check",(req,res)=>{
    res.send("Everythin is good")
})

app.use("/api/v1/post",postRoute);
app.use("/api/v1/user",userRoute);

app.listen(PORT,()=>{
    ConnectDB();
    console.log(`Post run successfully at ${PORT}`);
    
})



