const express = require('express');
const router=express.Router();
const controller=require('../controllers/userController');

router.get('/',controller.homepage);

router.get('/login',controller.logIn)

router.get('/signup',controller.signIn);

module.exports =router;