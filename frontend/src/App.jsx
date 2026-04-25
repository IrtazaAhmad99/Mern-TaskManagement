import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashbord from "./pages/DashBord"
import Users from "./pages/Users"
import VerifyOTP from "./pages/VerifyOTP";
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoutes";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashbord />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Users />
              </AdminRoute>
            </PrivateRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  )
}

export default App
