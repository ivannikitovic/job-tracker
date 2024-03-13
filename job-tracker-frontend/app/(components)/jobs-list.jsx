"use client";

import Link from "next/link";
import DeleteJob from "./delete-job";
import { Suspense, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import ActionBar from "./action-bar";
import AddJob from "./add-job";
import JobView from "./view-job";

export default function JobsList() {
    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState(getCookie("userId"));
    const [addJobOpen, setAddJobOpen] = useState(false);
    const [currentJobOpen, setCurrentJobOpen] = useState(null);

    const removeJob = (id) => {
        setJobs(jobs.filter((job) => job._id !== id));
    };

    const addJob = (job) => {
        jobs.push(job);
        setJobs(jobs);
    };

    const updateJob = (job) => {
        jobs.forEach((element, index) => {
            if (element._id === job._id) {
                jobs[index] = job;
            }
        });
        setJobs(jobs);
    };

    const ignoreChildClick = (e) => {
        e.stopPropagation();
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
        <div className="flex flex-col">
            {addJobOpen && (
                <div
                    onClick={() => setAddJobOpen(false)}
                    className="flex absolute inset-x-0 justify-center w-screen h-screen bg-gray-500 bg-opacity-50 z-50"
                >
                    <div onClick={ignoreChildClick} className="flex m-auto">
                        <div className="flex bg-white p-5 rounded-lg">
                            <AddJob
                                addJob={addJob}
                                setAddJobOpen={setAddJobOpen}
                            ></AddJob>
                        </div>
                    </div>
                </div>
            )}

            {currentJobOpen && (
                <div
                    onClick={() => setCurrentJobOpen(false)}
                    className="flex absolute inset-x-0 justify-center w-screen h-screen bg-gray-500 bg-opacity-50 z-50"
                >
                    <div onClick={ignoreChildClick} className="flex m-auto">
                        <div className="flex bg-white p-5 rounded-lg">
                            <JobView
                                jobId={currentJobOpen}
                                updateJob={updateJob}
                                setCurrentJobOpen={setCurrentJobOpen}
                            ></JobView>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-5 flex flex-row space-x-5">
                {jobs.length ? (
                    <ul>
                        {jobs.map((job) => {
                            return (
                                <li key={job._id} className="mb-3">
                                    <div
                                        onClick={() =>
                                            setCurrentJobOpen(job._id)
                                        }
                                        className="bg-white rounded-lg w-64 p-3 hover:opacity-80"
                                    >
                                        <div>
                                            <h1>{job.title}</h1>
                                            <h2>{job.company}</h2>
                                            <h2>{job.location}</h2>
                                        </div>
                                        <div
                                            onClick={ignoreChildClick}
                                            className="flex space-x-3 flex-row"
                                        >
                                            <DeleteJob
                                                jobId={job._id}
                                                removeJob={removeJob}
                                            />
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <></>
                )}
            </div>

            <ActionBar
                addJobOpen={addJobOpen}
                setAddJobOpen={setAddJobOpen}
            ></ActionBar>
        </div>
    );
}
