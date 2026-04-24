const User = require("../../models/users")

const AdminController = {

    async getAllUsers(req, res) {
        try {
            const users = await User.find().select("-password");

            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            ).select("-password");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                message: "User updated",
                user,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({ message: "User deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
module.exports = AdminController