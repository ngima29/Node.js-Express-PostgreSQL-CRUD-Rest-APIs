const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.post('/user',userController.registerUser);
route.get('/user',userController.getUser);
route.get('/user/:id',userController.getUserById);
route.put('/user/:id',userController.updateUserById);
route.delete('/user/:id',userController.deleteUserById);

route.post('/user/login',userController.login);
route.get('/user/confirmation/:token', userController.emailVerify);

module.exports = route;