"use client";

import Link from "next/link";
import DeleteJob from "./delete-job";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import ActionBar from "./action-bar";

export default function JobsList() {
    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState(getCookie("userId"));

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
                            <>
                                <li key={job._id} className="mb-3">
                                    <div className="border border-gray-300 rounded-lg w-64 p-3">
                                        <div>
                                            <h1>{job.title}</h1>
                                            <h2>{job.company}</h2>
                                            <h2>{job.location}</h2>
                                        </div>
                                        <div className="flex space-x-3 flex-row">
                                            <Link href={`/job-page/${job._id}`}>
                                                <h1 className="text-blue-500">
                                                    more
                                                </h1>
                                            </Link>
                                            <DeleteJob
                                                jobId={job._id}
                                                removeJob={removeJob}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <ActionBar></ActionBar>
                            </>
                        );
                    })}
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
}
