import Job from "../model/jobs.model.js";
import createHttpError from "http-errors";

export default class JobsService {
    static async createJob(userId, jobData) {
        try {
            const job = new Job({
                ...jobData,
                user_id: userId,
            });
            return await job.save();
        } catch (error) {
            if (error.name == "ValidationError") {
                throw createHttpError(400, error.message);
            } else {
                throw error;
            }
        }
    }

    static async getJobById(jobId) {
        try {
            const job = await Job.findById(jobId);
            if (!job) {
                throw createHttpError(404, "Job not found");
            }
            return job;
        } catch (error) {
            if (error.name === "CastError") {
                throw createHttpError(400, "Invalid job id");
            } else {
                throw error;
            }
        }

    }

    static async getJobsByUserId(userId) {
        try {
            const jobs = await Job.find({ user_id: userId });
            return jobs;
        } catch (error) {
            if (error.name === "CastError") {
                throw createHttpError(400, "Invalid user id");
            } else {
                throw error;
            }
        }
    }

    static async updateJob(userId, jobId, jobData) {
        try {
            const job = await Job.findByIdAndUpdate(jobId, {
                ...jobData,
                user_id: userId,
            }, { new: true });
            if (!job) {
                throw createHttpError(404, "Job not found");
            }
            return job;
        } catch (error) {
            if (error.name === "CastError") {
                throw createHttpError(400, "Invalid job id");
            } else {
                throw error;
            }
        }
    }

    static async deleteJob(jobId) {
        try {
            const job = await Job.findByIdAndDelete(jobId);
            if (!job) {
                throw createHttpError(404, "Job not found");
            }
            return job;
        } catch (error) {
            if (error.name === "CastError") {
                throw createHttpError(400, "Invalid job id");
            } else {
                throw error;
            }
        }
    }
}
