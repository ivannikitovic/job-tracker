import express from 'express';
import JobsController from '../controller/jobs.controller.js';
import { HttpError } from 'http-errors';
import { authenticateUser } from '../utils/auth.js';

const router = express.Router();

router
    .post('/:user_id', authenticateUser, JobsController.postJob)
    .get('/:user_id', authenticateUser, JobsController.getJobs)
    .get('/:user_id/:job_id', authenticateUser, JobsController.getJob)
    .put('/:user_id/:job_id', authenticateUser, JobsController.putJob)
    .delete('/:user_id/:job_id', authenticateUser, JobsController.deleteJob)
    .use((error, req, res, next) => {
        if (error instanceof HttpError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Internal Server Error: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    });

export default router;
