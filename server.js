//.ENV
require('dotenv').config()
//start server
const express = require("express");
const notFound = require('./middlewares/notFound');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRoute = require('./routes/auth-route');
const app = express();




//routing
app.use("/auth",authRoute)
app.use("/post",(req,res)=>{})
app.use("/comment",(req,res)=>{})
app.use("/like",(req,res)=>{})

//middlewares ดัก request not found & error
app.use(notFound)

//error.middlewares ถ้าไม่ error จะโชว์ html
app.use(errorMiddleware)

//running port 8000
const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`SERVER IS RUNNING ${port}`))