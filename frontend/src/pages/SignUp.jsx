import axios from "axios";
import React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

function SignUp() {
  // some colour for UI
  const primarycolor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgcolor = "#fff9f6";
  const bordercolor = "#ddd";

  const [showpassword, setshowpassword] = useState(false);
  const [role, setrole] = useState("user");

  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [mobnumber,setmobnumber]=useState("");
  const [password,setpassword]=useState("");

  const navigate=useNavigate()

  const handleSignUp = async()=>{
    try {
        const result = await axios.post(`${serverUrl}/api/auth/signup`,{
            name,email,mobnumber,password,role
        },{withCredentials:true})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 "
      style={{
        backgroundColor: bgcolor,
      }}
    >
      <div
        className={`bg-white rounded-xl shadow-xl w-full max-w-md p-8 border-[1px]`}
        style={{
          border: `1px solid ${bordercolor}`,
        }}
      >
        <h1
          className={` text-3xl font-bold mb-2 text-[${primarycolor}]`}
          style={{
            color: primarycolor,
          }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your Account to get started with delication food deliveries
        </p>
        {/* full name */}
        <div className="mb-4">
          <label
            htmlFor="FullName"
            className="block text-gray-600 font-medium mb-1"
          >
            FullName :
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Name "
            style={{ border: `1px solid ${bordercolor}` }}
            onChange={(e)=>setname(e.target.value)}
            value={name}
          />
        </div>
        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-1"
          >
            Email :
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none  "
            placeholder="Enter your Email "
            style={{ border: `1px solid ${bordercolor}` }}
            onChange={(e)=>setemail(e.target.value)}
            value={email}
          />
        </div>

        {/* Mobile number  */}
        <div className="mb-4">
          <label
            htmlFor="Mobile"
            className="block text-gray-600 font-medium mb-1"
          >
            Mobile Number :
          </label>
          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Mobile  "
            style={{ border: `1px solid ${bordercolor}` }}
            onChange={(e)=>setmobnumber(e.target.value)}
            value={mobnumber}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 font-medium mb-1"
          >
            Password :
          </label>
          <div className="relative">
            <input
              type={`${showpassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter your Mobile  "
              style={{ border: `1px solid ${bordercolor}` }}
              onChange={(e)=>setpassword(e.target.value)}
            value={password}
            />

            <button
              className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
              onClick={() => setshowpassword((prev) => !prev)}
            >
              {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}{" "}
            </button>
          </div>
        </div>

        {/* User Role  */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role :
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryboy"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setrole(r)}
                style={
                  role == r
                    ? { backgroundColor: primarycolor, color: "white" }
                    : { border: `1px solid ${primarycolor}`, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        {/* Signup button  */}
        <button
          className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        onClick={handleSignUp}
        >
          Signup
        </button>
        {/* Google autheticaation */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
          <FcGoogle size={20} />
          <span>Sign Up with Google </span>{" "}
        </button>
        <p className="text-center mt-6 cursor-pointer" onClick={()=>navigate("/signin")}>
            Already have an Account? 
            <span className='text-[#ff4d2d]'> Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
