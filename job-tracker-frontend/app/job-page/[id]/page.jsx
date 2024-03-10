const getJob = async (job_id) => {
    const headers = { Authorization: `Bearer ${process.env.BEARER_TOKEN}` };
    let jobs = await fetch(
        `http://localhost:3001/jobs/${process.env.USER_ID}/${job_id}`,
        { headers, cache: "no-store" }
    );
    return jobs.json();
};

export default async function Page({ params }) {
    const job = await getJob(params.id);

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Job Title</td>
                        <td>{job.title}</td>
                    </tr>
                    <tr>
                        <td>Company</td>
                        <td>{job.company}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>{job.location}</td>
                    </tr>
                    <tr>
                        <td>Salary</td>
                        <td>{job.salary}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{job.description}</td>
                    </tr>
                    <tr>
                        <td>Stage</td>
                        <td>{job.stage}</td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td>
                            <a href={job.url} className="text-blue-500">
                                {job.url}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
