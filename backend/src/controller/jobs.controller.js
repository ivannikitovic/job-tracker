import JobsService from "../services/jobs.service.js";

export default class JobsController {
    static async postJob(req, res, next) {
        try {
            const jobData = req.body;
            const postResponse = await JobsService.createJob(jobData);
            res.json(postResponse);
        } catch (error) {
            next(error);
        }
    }

    static async getJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const getResponse = await JobsService.getJobById(job_id);
            res.json(getResponse);
        } catch (error) {
            next(error);
        }
    }

    static async getJobs(req, res, next) {
        try {
            const { user_id } = req.params;
            const getResponse = await JobsService.getJobsByUserId(user_id);
            res.json(getResponse);
        } catch (error) {
            next(error);
        }
    }

    static async putJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const jobData = req.body;
            const updateResponse = await JobsService.updateJob(job_id, jobData);
            res.json(updateResponse);
        } catch (error) {
            next(error);
        }
    }

    static async deleteJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const deleteResponse = await JobsService.deleteJob(job_id);
            res.json(deleteResponse);
        } catch (error) {
            next(error);
        }
    }
}
