const express = require('express');
const router=express.Router();
const controller=require('../controllers/postBlogController')

router.get('/',controller.homePage);

router.get('/:id',controller.getPost);

router.get('/newPost',controller.createPost);

router.put('/:id',controller.updatePost);

router.delete('/:id',controller.deletePost);


module.exports =router;