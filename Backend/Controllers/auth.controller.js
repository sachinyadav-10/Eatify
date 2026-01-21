import User from "../models/user.model";

const signup=async(req,res)=>{
    try {
        const {fullname,email,password,mobilenumber,role} = req.body
        const user = await user.findOne({email})
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

    } catch (error) {
        
    }
}