import { auth } from "../../../../auth";
import dbConnect from "../../../../lib/dbConnect";
import JobsService from "../../../../services/jobs.service";

export async function GET(request, { params }) {
    const session = await auth();

    if (session) {
        await dbConnect();
        const userId = session.userId;
        const { jobId } = params;

        const result = await JobsService.getJobById(jobId);
        if (result.user_id.valueOf() === userId) {
            return new Response(JSON.stringify(result));
        } else {
            return new Response("Unauthorized", { status: 401 });
        }
    } else {
        return new Response("Unauthorized", { status: 401 });
    }
}

export async function PUT(request, { params }) {
    const session = await auth();

    if (session) {
        await dbConnect();
        const { jobId } = params;
        const userId = session.userId;
        const body = await request.json();

        const job = await JobsService.getJobById(jobId);
        if (!(job.user_id.valueOf() === userId)) {
            return new Response("Unauthorized", { status: 401 });
        }

        const result = await JobsService.updateJob(userId, jobId, body);
        return new Response(JSON.stringify(result));
    } else {
        return new Response("Unauthorized", { status: 401 });
    }
}

export async function DELETE(request, { params }) {
    const session = await auth();

    if (session) {
        await dbConnect();
        const { jobId } = params;
        const userId = session.userId;

        const job = await JobsService.getJobById(jobId);
        if (!(job.user_id.valueOf() === userId)) {
            return new Response("Unauthorized", { status: 401 });
        }

        const result = await JobsService.deleteJob(jobId);
        return new Response(JSON.stringify(result));
    } else {
        return new Response("Unauthorized", { status: 401 });
    }
}
