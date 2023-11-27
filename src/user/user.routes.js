const express = require("express")

const router = express.Router()

const userControllers = require("./user.controllers")



router.get("/users/", userControllers.findAll)
router.post("/users/", userControllers.create) 
router.get("/users/:id", userControllers.findOne)
router.patch("/users/:id", userControllers.update)
router.delete("/users/:id", userControllers.deleteUser)

module.exports = router



