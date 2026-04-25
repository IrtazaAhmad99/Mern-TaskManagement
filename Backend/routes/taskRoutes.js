const express = require("express")
const router = express.Router()

const TaskController = require("../controllers/Task/TaskController.js")

const {protectedRoutes} = require("../middlewares/authMiddleware.js")

router.use(protectedRoutes)

router.post("/create", TaskController.createTask)

router.get("/getall", TaskController.getAllTask)

router.put("/:id", TaskController.updateTask)

router.delete("/delete/:id", TaskController.deleteTask)

router.get("/single/:id", TaskController.getSingleTask)

module.exports = router;