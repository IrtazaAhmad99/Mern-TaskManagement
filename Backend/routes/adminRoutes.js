const express = require("express")
const router = express.Router()

const AdminController = require("../controllers/Admin/AdminController")
const {protectedRoutes} = require("../middlewares/authMiddleware.js")
const {adminOnly} = require("../middlewares/adminMiddleware.js")

router.use(protectedRoutes);
router.use(adminOnly);

router.get("/getAllUsers", AdminController.getAllUsers)

router.put("/updateUser/:id",AdminController.updateUser)

router.delete("/deleteUser/:id", AdminController.deleteUser)

module.exports = router;
