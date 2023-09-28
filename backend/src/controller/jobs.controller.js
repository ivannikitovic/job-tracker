import JobsService from "../services/jobs.service.js";

export default class JobsController {
    static async postJob(req, res, next) {
        try {
            const jobData = req.body;
            const postResponse = await JobsService.createJob(jobData);
            res.json(postResponse);
        } catch (error) {
            console.error(`error posting job: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const getResponse = await JobsService.getJobById(job_id);
            if (!getResponse) {
                res.status(404).json({ error: "Job not found." });
            } else {
                res.json(getResponse);
            }
        } catch (error) {
            console.error(`error getting job: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async getJobs(req, res, next) {
        try {
            const { user_id } = req.params;
            const getResponse = await JobsService.getJobsByUserId(user_id);
            res.json(getResponse);
        } catch (error) {
            console.error(`error getting jobs: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async putJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const jobData = req.body;
            const updateResponse = await JobsService.updateJob(job_id, jobData);
            res.json(updateResponse);
        } catch (error) {
            console.error(`error updating job: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const deleteResponse = await JobsService.deleteJob(job_id);
            if (!deleteResponse) {
                res.status(404).json({ error: "Job not found." });
            } else {
                res.json(deleteResponse);
            }
        } catch (error) {
            console.error(`error deleting job: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }
}
