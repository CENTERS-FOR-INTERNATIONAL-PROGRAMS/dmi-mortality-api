"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userController = new UserController();

// Define routes
router.get('/users', userController.getUsers);

module.exports = router;

