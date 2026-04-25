import React, { useEffect, useState } from "react";
import { AdminAPI } from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 

    navigate("/");
  };

  const fetchUsers = async () => {
    try {
      const res = await AdminAPI.getALLUsers()
      setUsers(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await AdminAPI.deleteUsers(id)
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateUser = async () => {
    try {
      const res = await AdminAPI.updateUsers(editUser._id, {
        name: editUser.name,
        email: editUser.email,
      });
      const updatedUser = res.user;

      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? res : u))
      );

      setEditUser(null);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin - Users</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {editUser && (
        <div className="mb-4 p-4 bg-white shadow rounded">
          <h2 className="font-bold mb-2">Edit User</h2>

          <input
            className="border p-2 mr-2"
            value={editUser.name}
            onChange={(e) =>
              setEditUser({ ...editUser, name: e.target.value })
            }
            placeholder="Name"
          />

          <input
            className="border p-2 mr-2"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            placeholder="Email"
          />

          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() => setEditUser(null)}
            className="ml-2 bg-gray-500 text-white px-3 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="bg-white shadow rounded p-4">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date </th>
                <th>Actions</th>
                
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="text-center border-t">
                  <td className="p-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditUser(u)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
              
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;