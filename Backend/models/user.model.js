import mongoose from "mongoose"

const UserScheme = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type : String,
        required:true,
        unique:true
    },
    password:{
        type : String,

    },
    mobilenumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","owner","deliveryboy"],
        required:true
    },
}, {timestamps : true})

const User=mongoose.model("User",UserScheme)
export default User