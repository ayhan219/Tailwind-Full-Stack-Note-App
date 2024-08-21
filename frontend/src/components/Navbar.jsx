import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-11/12 h-24 bg-red-600 flex justify-around items-center rounded-full mx-auto mt-3 shadow-2xl ">
      <Link to={"/"}><div className="text-3xl font-extrabold text-white animate-bounce">Note App</div></Link>
      <div className="flex gap-20 text-white text-3xl font-extrabold">
        <Link to={"/login"}><a href="" className="hover:text-slate-900">Login</a></Link>
        <Link to={"/signup"}><a href="" className="hover:text-slate-900 ">Signup</a></Link>
      </div>
    </div>
  );
};

export default Navbar;
