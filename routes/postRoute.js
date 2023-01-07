const express = require('express');
const route = express.Router();
const postController = require('../controllers/postController')
const multer = require('multer');
const path = require('path');



route.post('/post',postController.insertPost);
route.get('/post',postController.getAllPost);
route.get('/post/:id',postController.getPostById);
route.put('/post/:id',postController.updatePost);
route.delete('/post/:id',postController.deletePost);


module.exports = route;