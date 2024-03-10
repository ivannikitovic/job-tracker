const getJobs = async () => {
    const headers = { 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}
    let jobs = await fetch("http://localhost:3001/jobs/656b857734c77ea58da7b0a0", { headers, cache: 'no-store' })
    return jobs.json()
}

export default async function JobsList() {
    const jobs = await getJobs()
    return (
    <div>
        <ul>
          {jobs.map((job) => {
            return (
                <li key={job._id} className="mt-3">
                    {job.title}
                </li>
            )
          })}
        </ul>
      </div>
    )
}