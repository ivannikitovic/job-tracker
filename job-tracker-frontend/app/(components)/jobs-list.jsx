import Link from "next/link";
import DeleteJob from "./delete-job";
import { cookies } from "next/headers";

export default async function JobsList() {
    const getJobs = async () => {
        const userId = cookies().get("userId").value;
        const token = cookies().get("jwt").value;

        const headers = { Authorization: `Bearer ${token}` };
        let jobs = await fetch(`http://localhost:3001/jobs/${userId}`, {
            headers,
            cache: "no-store",
        });
        return jobs.json();
    };

    const jobs = await getJobs();

    return (
        <div>
            <ul>
                {jobs.map((job) => {
                    return (
                        <li key={job._id} className="mb-3">
                            <Link href={`/job-page/${job._id}`}>
                                {job.title}
                            </Link>
                            <DeleteJob job_id={job._id} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
