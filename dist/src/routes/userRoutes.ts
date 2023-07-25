"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

//routes
router.get("/users", async (req, res) =>{
    const result = await UserController.getUsers()
    res.send(result)
})

router.get("/user/:id", async (req, res) =>{
    const id = req.params.id
    const User = await UserController.getUser(id)
    if(!User) res.status(404).send('User not found')
    res.send(User)

})

module.exports = router;

