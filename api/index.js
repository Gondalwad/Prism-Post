import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express();

//Connecting to database
dotenv.config();
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log("The server is running on port 3000");
});