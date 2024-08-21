import { useState } from "react"
import Navbar from "./components/Navbar"
import LoginNavbar from "./components/LoginNavbar"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";


function App() {
 
  const [isLogin,setIsLogin] = useState(false);
  const handleSetLogin=(e)=>{
    setIsLogin(e);
  }
  return (
    <Router>
      {!isLogin?<Navbar />: <LoginNavbar handleSetLogin={handleSetLogin} />}
      <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/login" element={<Login handleSetLogin={handleSetLogin} />} />
       <Route path="/signup" element={<Register />} />
       <Route path="/createpost" element={<AddPost />} />
      </Routes>
    </Router>
  )
}

export default App
