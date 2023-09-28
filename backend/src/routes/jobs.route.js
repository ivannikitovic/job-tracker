import express from 'express';
import JobsController from '../controller/jobs.controller.js';

const router = express.Router();

router
    .post('/', JobsController.postJob)
    .get('/user/:user_id', JobsController.getJobs)
    .get('/:job_id', JobsController.getJob)
    .put('/:job_id', JobsController.putJob)
    .delete('/:job_id', JobsController.deleteJob)

export default router;
