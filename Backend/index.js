import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDB from "./config/Db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"

const app = express()
const Port = process.env.PORT 

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use(cors({
    origin:"https://localhost:5173",
    credentials:true
}))

app.listen(Port, ()=>{
    connectDB()
    
    console.log(`server stared at ${Port}`)
})
