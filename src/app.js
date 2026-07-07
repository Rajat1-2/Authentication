import express from 'express'
import morgan from 'morgan';
const app=express();
app.use(express.json());
// new logger api req res time etc..
app.use(morgan("dev"));



export default app;
