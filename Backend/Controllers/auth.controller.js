import User from "../models/user.model.js";
import genToken from "../utiles/token.js";
import bcrypt from "bcryptjs"

// Signup API
export const signUp=async(req,res)=>{
    try {
        const {fullname,email,password,mobilenumber,role} = req.body
        let user = await user.findOne({email})
        if(user){
            return res.status(400).json({message: "User Already exist."})
        }
        if(password < 6){
            return res.status(400).json({message: "Password must be atleast 6 character"})
        }
        if(mobilenumber < 10){
            return res.status(400).json({message: "Mobile number  must be atleast 10 digits."})
        }
        const hashedPassword = await  bcrypt.hash(password,10) // hash the password 

        user = await User.create({
            fullname,
            email,
            role,
            mobilenumber,
            password : hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

       return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json(`sign up error ${error}`)
    }
}

// SignIn API
export const signIn=async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await user.findOne({email})
        if(!user){
            return res.status(400).json({message: "User Does not exist."})
        }
        
       //Compare hashpassword with the userpassword
       const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            return res.status(400).json({message: "incorret passsword"})
        }


        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

       return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(`sign In error ${error}`)
    }
}

// SignOut API

export const signOut = async(req,res)=>{
    try{
        res.clearcookie("token")

        return res.status(200).json({message :"Log Out Successfully"})

    }catch(error){
          return res.status(500).json(`sign Out error ${error}`)
    }
}