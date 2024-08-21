import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";


const Login = ({handleSetLogin}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSetEmail= (e)=>{
    setEmail(e.target.value);
  }
  const handleSetPassword= (e)=>{
    setPassword(e.target.value);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:5000/api/auth/login",{
        email,
        password
      })

      const token = response.data.token
      localStorage.setItem("authToken",token);
      handleSetLogin(true);
      console.log("login successfull,token stored",token);
      navigate("/");
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={handleSetEmail}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={handleSetPassword}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
