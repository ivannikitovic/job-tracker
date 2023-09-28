import express from 'express';
import UserController from '../controller/user.controller.js';
import { HttpError } from 'http-errors';

const router = express.Router();

router
    .post('/signup', UserController.signUp)
    .post('/login', UserController.signIn)
    .use((error, req, res, next) => {
        if (error instanceof HttpError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Internal Server Error: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    });

export default router;
