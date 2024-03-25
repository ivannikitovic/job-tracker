import { auth } from "../../../auth";
import dbConnect from "../../../lib/dbConnect";
import JobsService from "../../../services/jobs.service";

export async function GET(request, { params }) {
    const session = await auth();
    if (session) {
        await dbConnect();
        const userId = session.userId;

        const result = await JobsService.getJobsByUserId(userId);
        return new Response(JSON.stringify(result));
    } else {
        return new Response("Unauthorized", { status: 401 });
    }
}

export async function POST(request, { params }) {
    const session = await auth();
    if (session) {
        await dbConnect();
        const userId = session.userId;
        const body = await request.json();

        const result = await JobsService.createJob(userId, body);
        return new Response(JSON.stringify(result));
    } else {
        return new Response("Unauthorized", { status: 401 });
    }
}
