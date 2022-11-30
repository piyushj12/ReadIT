const express = require('express');
const router=express.Router();
const controller=require('../controllers/userController');

router.get('/',controller.homepage);


router.get('/login',controller.logIn)

router.post('/login',controller.handleLogIn)

router.get('/signup',controller.signIn);

router.post('/signup',controller.handleSignIn);

router.get('/logout',controller.logout);

module.exports =router;