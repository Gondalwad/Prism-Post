import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import testRoute from './routes/user.route.js'
import signup from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
//Connecting to database
dotenv.config();
app.use(cookieParser());


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
app.use('/api/user',signup);
app.use('/api/post',postRoute);

app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});