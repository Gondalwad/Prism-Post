import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import testRoute from './routes/user.route.js'
const app = express();

//Connecting to database
dotenv.config();
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});

/// let server run on specified port
const port = 3000;
app.listen(port,()=>{
    console.log("The server is running on port 3000");
});

//test api
app.use('/api/user',testRoute);