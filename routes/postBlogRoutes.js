const express = require('express');
const router=express.Router();
const controller=require('../controllers/postBlogController')
const {isAuthenticated} =require('../middleware/authentication');

router.get('/',controller.allPosts);

router.get('/new',isAuthenticated,controller.createNewPost);

router.get('/:id',isAuthenticated,controller.getPost);


router.post('/new', controller.createPost);

router.post('/newComment', controller.createComment);

router.post('/upvote', controller.upvote);

router.post('/downvote', controller.downvote);

router.put('/:id',controller.updatePost);

router.delete('/:id',controller.deletePost);


module.exports =router;