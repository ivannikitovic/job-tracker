import Job from "../model/jobs.model.js";

export default class JobsService {
    static async createJob(jobData) {
        try {
            const job = new Job(jobData);
            return await job.save();
        } catch (error) {
            console.log(`Error creating job: ${error}`);
            throw error;
        }
    }

    static async getJobById(jobId) {
        try {
            return await Job.findById(jobId);
        } catch (error) {
            console.log(`Error getting job: ${error}`);
            throw error;
        }
    }

    static async getJobsByUserId(userId) {
        try {
            return await Job.find({ user_id: userId });
        } catch (error) {
            console.log(`Error getting jobs: ${error}`);
            throw error;
        }
    }

    static async updateJob(jobId, jobData) {
        try {
            return await Job.findByIdAndUpdate(jobId, jobData, { new: true });
        } catch (error) {
            console.log(`Error updating job: ${error}`);
            throw error;
        }
    }

    static async deleteJob(jobId) {
        try {
            return await Job.findByIdAndDelete(jobId);
        } catch (error) {
            console.log(`Error deleting job: ${error}`)
            throw error;
        }
    }
}
