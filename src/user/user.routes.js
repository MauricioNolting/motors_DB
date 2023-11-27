const express = require("express")

const router = express.Router()

const userControllers = require("./user.controllers")



router.get("/user/", userControllers.findAll)
router.post("/user/", userControllers.create) 
router.get("/user/:id", userControllers.findOne)
router.patch("/user/:id", userControllers.update)
router.delete("/user/:id", userControllers.deleteUser)

module.exports = router



