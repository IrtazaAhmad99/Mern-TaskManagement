import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TaskAPI } from "../axiosConfig";
import Navbar from "../component/Navbar";

const socket = io("http://localhost:5000");

const Dashbord = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    try {
      const res = await TaskAPI.getAllTak();
      setTasks(res.tasks || res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();

    socket.on("task-created", (task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task-updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket.on("task-deleted", (id) => {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    });

    return () => {
      socket.off("task-created");
      socket.off("task-updated");
      socket.off("task-deleted");
    };
  }, []);

 
  const handleCreateTask = async () => {
    try {
      await TaskAPI.createTask(form);
      setForm({ title: "", description: "", priority: "medium" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await TaskAPI.deleteTask(id);
      setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== id)
    );
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await TaskAPI.UpdateTask(id, { status });
    } catch (err) {
      console.log(err);
    }
  };

  
  const filteredTasks = filter === "all"  ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar user={user}/>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex gap-2 mb-4">
        {["all", "pending", "in-progress", "done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>


      <div className="bg-white p-4 rounded mb-4 shadow">
        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="border p-2 w-full mb-2"
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow"
          >
            <h2 className="font-bold text-lg">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>

            <select
              value={task.status}
              onChange={(e) =>
                handleStatusChange(task._id, e.target.value)
              }
              className="border p-1 mt-2 w-full"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </select>

  
            <p className="mt-2 text-sm">
              Priority:{" "}
              <span className="font-bold">
                {task.priority}
              </span>
            </p>

            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-3 py-1 mt-3 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashbord;