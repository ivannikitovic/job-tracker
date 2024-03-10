const job = {
    _id: "65eccbfc2d0b119933cfd2c9",
    title: "Software Developer",
    company: "Example Inc. 3 e",
    location: "New York, NY",
    salary: "75000 - 90000 USD per year",
    description:
        "We are looking for a skilled software developer to join our team.",
    stage: "Interview",
    deadline: "2023-10-31",
    url: "https://example.com/job/software-developer",
    user_id: "656b857734c77ea58da7b0a0",
    __v: 0,
};

export default function Page({ params }) {
    console.log(params);
    return (
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
    );
}
