import express from 'express';
import JobsController from '../controller/jobs.controller.js';
import { HttpError } from 'http-errors';

const router = express.Router();

router
    .post('/', JobsController.postJob)
    .get('/user/:user_id', JobsController.getJobs)
    .get('/:job_id', JobsController.getJob)
    .put('/:job_id', JobsController.putJob)
    .delete('/:job_id', JobsController.deleteJob)
    .use((error, req, res, next) => {
        if (error instanceof HttpError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Internal Server Error: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    });

export default router;
