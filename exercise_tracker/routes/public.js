const express = require("express")
const publicRouter = express.Router()
const userController = require("../controllers/userController")
const exerciseController = require("../controllers/exerciseController")
publicRouter.post("/api/users", userController.createUser)
publicRouter.get("/api/users", userController.findAllUsers)
publicRouter.post("/api/users/:_id/exercises", exerciseController.createExercise)
publicRouter.get("/api/users/:_id/logs", userController.getLogs)
module.exports = publicRouter