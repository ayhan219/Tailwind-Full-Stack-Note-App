import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({handleSetLogin}) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // JWT'yi localStorage veya sessionStorage'dan sil
    localStorage.removeItem("token"); // Eğer token'ı localStorage'da saklıyorsanız
    // sessionStorage.removeItem("token"); // Eğer token'ı sessionStorage'da saklıyorsanız

    // Kullanıcıyı giriş sayfasına yönlendir
    handleSetLogin(false)
    
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="w-11/12 h-24 bg-red-600 flex justify-around items-center rounded-full mx-auto mt-3 shadow-2xl ">
      <Link to="/"> 
        <div className="text-3xl font-extrabold text-white animate-bounce">Note App</div>
      </Link>
      <div className="flex gap-20 text-white text-3xl font-extrabold">
        <Link to="/createpost">
          <div className="hover:text-slate-900">Create ToDo</div>
        </Link>
        <div onClick={handleSignOut} className="hover:text-slate-900 cursor-pointer">
          Sign out
        </div>
      </div>
    </div>
  );
};

export default Navbar;
