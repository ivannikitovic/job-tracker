"use client";

import { useEffect, useState } from "react";
import ActionBar from "./action-bar";
import AddJob from "./add-job";
import JobView from "./view-job";

export default function JobsList() {
    const [jobs, setJobs] = useState([]);
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

    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).substr(-2);
        }
        return color;
    };

    useEffect(() => {
        fetch(`api/jobs`, {
            cache: "no-store",
        })
            .then((response) => response.json())
            .then((data) => {
                setJobs(data);
            });
    }, []);

    const jobMap = {
        wishlist: "Wishlist",
        applied: "Applied",
        screen: "Screen",
        oa: "Assessment",
        interview: "Interview",
        offer: "Offer",
        rejection: "Rejection",
        archive: "Archive",
    };

    const jobStack = (stage) => (
        <div>
            <div className="flex text-center justify-center text-3xl text-white w-64 p-5 pt-7 pb-7 rounded-lg mb-3">
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
                                            className="group flex justify-between items-center bg-white rounded-lg w-64 pr-3 pt-3 pb-3 transition ease-in-out hover:opacity-75"
                                        >
                                            <div
                                                className="flex justify-center m-auto" // todo: center this
                                            >
                                                <img
                                                    className="bg-opacity-0"
                                                    width={40}
                                                    height={40}
                                                    src={`https://logo.clearbit.com/${job.company}.com`}
                                                    onError={(e) => {
                                                        const color =
                                                            stringToColor(
                                                                job.company
                                                            ); // Generate color based on the company name
                                                        e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="100%" height="100%" fill="${encodeURIComponent(
                                                            color
                                                        )}" /></svg>`;
                                                    }}
                                                    alt={"Company logo"}
                                                ></img>
                                            </div>
                                            <div>
                                                <h1 className="font-semibold truncate w-44">
                                                    {job.title}
                                                </h1>
                                                <h2 className="truncate w-44">
                                                    {job.company}
                                                </h2>
                                                <h2 className="font-thin truncate w-44">
                                                    {job.location}
                                                </h2>
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
                    className="flex fixed overflow-y-scroll inset-x-0 justify-center w-screen h-screen bg-gray-500 bg-opacity-50 z-50 sm:p-0 pt-[3rem] pb-[10rem]"
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
                    className="flex fixed overflow-y-scroll inset-x-0 justify-center w-screen h-screen bg-gray-500 bg-opacity-50 z-50 sm:p-0 pt-[3rem] pb-[10rem]"
                >
                    <div onClick={ignoreChildClick} className="flex m-auto">
                        <div className="flex bg-white p-5 rounded-lg">
                            <JobView
                                jobId={currentJobOpen}
                                updateJob={updateJob}
                                removeJob={removeJob}
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
