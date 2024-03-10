import Link from "next/link";

const getJobs = async () => {
    const headers = { Authorization: `Bearer ${process.env.BEARER_TOKEN}` };
    let jobs = await fetch(
        `http://localhost:3001/jobs/${process.env.USER_ID}`,
        { headers, cache: "no-store" }
    );
    return jobs.json();
};

export default async function JobsList() {
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
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
