import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashbord from "./pages/DashBord"
import Users from "./pages/Users"
import VerifyOTP from "./pages/VerifyOTP";

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashbord" element={<Dashbord/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/verify-otp" element={<VerifyOTP/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
