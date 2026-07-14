import express from 'express'
import morgan from 'morgan';

import authRouter from './routes/auth.routes.js';

import cookieParser from "cookie-parser";
const app = express();
// to parse cookies across the web apicalls
app.use(express.json());
app.use(cookieParser());

// new logger api req res time etc..
app.use(morgan("dev"));


app.use("/api/auth",authRouter);
app.get('/',(req,res)=>{
    res.status(402).json({
        message : "server is started"
    })
})



export default app;
