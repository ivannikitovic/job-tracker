import express from 'express';
import UserController from '../controller/user.controller.js';

const router = express.Router();

router
    .post('/signup', UserController.signUp)
    .post('/login', UserController.signIn)

export default router;
