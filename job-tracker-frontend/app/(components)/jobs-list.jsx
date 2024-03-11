"use client";

import Link from "next/link";
import DeleteJob from "./delete-job";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function JobsList() {
    const [jobs, setJobs] = useState([]);

    const userId = getCookie("userId");
    console.log(userId);

    const removeJob = (id) => {
        setJobs(jobs.filter((job) => job._id !== id));
    };

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3001/jobs/${userId}`, {
                credentials: "include",
                cache: "no-store",
            })
                .then((response) => response.json())
                .then((data) => {
                    setJobs(data);
                });
        }
    }, []);

    return (
        <div>
            {jobs.length ? (
                <ul>
                    {jobs.map((job) => {
                        return (
                            <li key={job._id} className="mb-3">
                                <Link href={`/job-page/${job._id}`}>
                                    {job.title}
                                </Link>
                                <DeleteJob
                                    jobId={job._id}
                                    removeJob={removeJob}
                                />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
}
