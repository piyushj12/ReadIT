const express = require('express');
const router=express.Router();
const controller=require('../controllers/postBlogController')

router.get('/',controller.allPosts);

router.get('/new',controller.createNewPost);

router.get('/:id',controller.getPost);


router.post('/newPost', controller.createPost)

router.put('/:id',controller.updatePost);

router.delete('/:id',controller.deletePost);


module.exports =router;