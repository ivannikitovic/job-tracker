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

    const jobMap = {
        wishlist: "Wishlist",
        applied: "Applied",
        screen: "Screen",
        oa: "OA",
        interview: "Interview",
        offer: "Offer",
        rejection: "Rejection",
        archive: "Archive",
    };

    const jobStack = (stage) => (
        <div>
            <div className="flex justify-center bg-white w-64 p-5 pt-7 pb-7 rounded-lg mb-3">
                <h1>{jobMap[stage]}</h1>
            </div>
            <div className="flex flex-row space-x-5">
                {jobs.length ? (
                    <ul>
                        {jobs
                            .filter((job) => job.stage === stage)
                            .map((job) => {
                                return (
                                    <li key={job._id} className="mb-3">
                                        <div
                                            onClick={() =>
                                                setCurrentJobOpen(job._id)
                                            }
                                            className="group flex justify-between items-center bg-white rounded-lg w-64 p-3 transition ease-in-out hover:bg-opacity-65"
                                        >
                                            <div>
                                                <h1>{job.title}</h1>
                                                <h2>{job.company}</h2>
                                                <h2>{job.location}</h2>
                                            </div>
                                            <div
                                                className="hidden group-hover:block"
                                                onClick={ignoreChildClick}
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
        </div>
    );

    return (
        <div className="flex flex-col">
            {addJobOpen && (
                <div
                    onClick={() => setAddJobOpen(false)}
                    className="flex fixed inset-x-0 justify-center w-screen h-screen bg-gray-500 bg-opacity-50 z-50"
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

            <div className="flex flex-row justify-between m-5 gap-3">
                {jobStack("wishlist")}
                {jobStack("applied")}
                {jobStack("screen")}
                {jobStack("oa")}
                {jobStack("interview")}
                {jobStack("offer")}
                {jobStack("rejection")}
                {jobStack("archive")}
            </div>

            <ActionBar
                addJobOpen={addJobOpen}
                setAddJobOpen={setAddJobOpen}
            ></ActionBar>
        </div>
    );
}
