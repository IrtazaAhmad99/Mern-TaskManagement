const Task = require("../../models/task")

const TaskController = {
    async createTask(req, res) {
        try {
            const { title, description, status, priority } = req.body;
            if (!title) {
                return res.status(400).json({ message: "Title is required" });
            }

            const validStatus = ["pending", "in-progress", "done"];
            const validPriority = ["low", "medium", "high"];

            if (status && !validStatus.includes(status)) {
                return res.status(400).json({ message: "Invalid status" });
            }
            if (priority && !validPriority.includes(priority)) {
                return res.status(400).json({ message: "Invalid priority" });
            }

            const task = await Task.create({
                title,
                description,
                status,
                priority,
                user: req.user._id,
            });

            req.io?.emit("task-created", task);

            return res.status(201).json({
                message: "Task created successfully",
                task,
            });

        } catch (error) {
            console.error("Create task error:", error);
            return res.status(500).json({ message: "Server error", error: error.message });

        }
    },
    async updateTask(req, res) {
        try {
            const { status, priority } = req.body;

            const task = await Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // ownership check
            if (task.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Not authorized" });
            }

            const validStatus = ["pending", "in-progress", "done"];
            const validPriority = ["low", "medium", "high"];

            if (status && !validStatus.includes(status)) {
                return res.status(400).json({ message: "Invalid status" });
            }

            if (priority && !validPriority.includes(priority)) {
                return res.status(400).json({ message: "Invalid priority" });
            }

            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            // SOCKET.IO
            req.io?.emit("task-updated", updatedTask);

            return res.status(200).json({
                message: "Task updated successfully",
                task: updatedTask,
            });

        } catch (error) {
            console.error("Update task error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    },
    async deleteTask(req, res) {
        try {
            const task = await Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // ownership check
            if (task.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Not authorized" });
            }

            await task.deleteOne();

            // SOCKET.IO
            req.io?.emit("task-deleted", { id: req.params.id });

            return res.status(200).json({
                message: "Task deleted successfully",
            });

        } catch (error) {
            console.error("Delete task error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    },

    async getAllTask(req, res) {
        try {
            const { status } = req.query;

            let filter = { user: req.user._id };

            // optional filter by status
            if (status) {
                filter.status = status;
            }

            const tasks = await Task.find(filter).sort({ createdAt: -1 });

            return res.status(200).json({
                count: tasks.length,
                tasks,
            });

        } catch (error) {
            console.error("Get tasks error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    },
    async getSingleTask(req, res) {
        try {
            const task = await Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // ownership check
            if (task.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Not authorized" });
            }

            return res.status(200).json(task);

        } catch (error) {
            console.error("Get single task error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    }
}  
module.exports=TaskController