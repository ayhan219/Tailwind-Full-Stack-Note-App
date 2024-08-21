import React, { useEffect, useState } from "react";
import axios from "axios";


const Header = () => {

  const [data,setDatas]= useState([]);

  useEffect(()=>{
    const fetchedPosts = async()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/post");
        setDatas(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchedPosts();
  },[])
  
  return (
    <div className="w-11/12 h-screen bg-slate-200 m-auto mt-5 shadow-2xl rounded-xl flex gap-4 flex-wrap">
      {data.map((item)=>(
        
        <div key={item._id} className="w-96 h-64 border-solid border-2 border-sky-500 shadow-2xl bg-gray-50 ">
        <div className="w-full h-10  text-center">
            <h3 className="text-2xl text-gray-900 font-bold">{item.title}(Added by:{item.user.username})</h3>
        </div>
        <div className="w-full h-full">
            <p className="text-xl font-bold">{item.content}</p>
        </div>
      </div>
      ))}
      
      

    </div>
  );
};

export default Header;
