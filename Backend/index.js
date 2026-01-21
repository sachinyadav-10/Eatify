import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/Db.js"
dotenv.config()

const app = express()
const Port = process.env.PORT || 5000

app.listen(Port, ()=>{
   connectDB()
    console.log(`server stared at ${Port}`)
})
