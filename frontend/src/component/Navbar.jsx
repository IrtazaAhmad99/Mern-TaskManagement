import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      
      <h1 className="text-xl font-bold">Task Manager</h1>

      <div className="flex items-center gap-4">
        <p className="text-sm">
         {user?.name?.toUpperCase() || "User"}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;