import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let jobs;

export default class JobsModel {
    static async injectDB(conn) {
        if (jobs) {
            return;
        }
        try {
            jobs = await conn.db(process.env.MONGODB_DB_NAME).collection("jobs");
        } catch (e) {
            console.error(`Unable to establish collection handles in jobsModel: ${e}`);
        }
    }

    static async addJob(title, company, location, salary, description, stage, deadline, url, user_id) {
        try {
            const jobDoc = { 
                title, 
                company, 
                location, 
                salary, 
                description, 
                stage, 
                deadline, 
                url, 
                user_id: new ObjectId(user_id),
            };
            return await jobs.insertOne(jobDoc);
        } catch (e) {
            console.error(`unable to post job: ${e}`);
            return { error: e };
        }
    }

    static async getJob(job_id) {
        try {
            return await jobs.findOne({ _id: new ObjectId(job_id) });
        } catch (e) {
            console.error(`unable to get job: ${e}`);
            return { error: e };
        }
    }

    static async getJobs(user_id) {
        try {
            return await jobs.find({ user_id: new ObjectId(user_id) }).toArray();
        } catch (e) {
            console.error(`unable to get jobs: ${e}`);
            return { error: e };
        }
    }

    static async updateJob(job_id, title, company, location, salary, description, stage, deadline, url) {
        try {
            const updateResponse = await jobs.updateOne(
                { _id: new ObjectId(job_id) },
                { $set: { 
                    title, 
                    company, 
                    location, 
                    salary, 
                    description, 
                    stage, 
                    deadline, 
                    url,
                } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`unable to update job: ${e}`);
            return { error: e };
        }
    }

    static async deleteJob(job_id) {
        try {
            const deleteResponse = await jobs.deleteOne({ _id: new ObjectId(job_id) });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete job: ${e}`);
            return { error: e };
        }
    }
}
