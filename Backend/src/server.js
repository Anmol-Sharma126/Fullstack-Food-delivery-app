import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js';
import foodRouter from '../routes/foodroute.js';

// app config
const app =express()

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("Api working")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})