const express = require('express');
const router=express.Router();
const controller=require('../controllers/postBlogController')
const {isAuthenticated} =require('../middleware/authentication');

router.get('/',controller.allPosts);

router.get('/new',isAuthenticated,controller.createNewPost);

router.get('/:id',isAuthenticated,controller.getPost);

router.get('/:id/editBlog',isAuthenticated,controller.getEditBlog);

router.post('/new', controller.createPost);

router.post('/newComment', controller.createComment);

router.post('/upvote', controller.upvote);

router.post('/downvote', controller.downvote);

router.put('/:id',isAuthenticated,controller.updateBlog);

router.delete('/:id',controller.deletePost);


module.exports =router;