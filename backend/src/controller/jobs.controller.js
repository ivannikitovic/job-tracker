import JobsModel from "../model/jobs.model.js";

export default class JobsController {
    static async postJob(req, res, next) {
        try {
            const { title, company, location, salary, description, stage, deadline, url, user_id } = req.body;
            const postResponse = await JobsModel.addJob(title, company, location, salary, description, stage, deadline, url, user_id);
            res.json(postResponse);
        } catch (e) {
            console.error(`error posting job: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async getJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const getResponse = await JobsModel.getJob(job_id);
            res.json(getResponse);
        } catch (e) {
            console.error(`error getting job: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async getJobs(req, res, next) {
        try {
            const { user_id } = req.params;
            const getResponse = await JobsModel.getJobs(user_id);
            res.json(getResponse);
        } catch (e) {
            console.error(`error getting jobs: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async putJob(req, res, next) {
        try {
            const { job_id } = req.params;
            const { title, company, location, salary, description, stage, deadline, url } = req.body;
            const updateResponse = await JobsModel.updateJob(job_id, title, company, location, salary, description, stage, deadline, url);
            res.json(updateResponse);
        } catch (e) {
            console.error(`error updating job: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async deleteJob(req, res, next) {1
        try {
            const { job_id } = req.params;
            const deleteResponse = await JobsModel.deleteJob(job_id);
            res.json(deleteResponse);
        } catch (e) {
            console.error(`error deleting job: ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
