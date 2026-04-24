const User = require("../models/users")
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" })
        if (adminExists) return

        const hashPassword = await bcrypt.hash("12345678", 10)

        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
            isVerified: true,
        })
        console.log("Admin created successfully");

    } catch (error) {
         console.log("Admin seed error:", error.message);
    }
}

module.exports = seedAdmin