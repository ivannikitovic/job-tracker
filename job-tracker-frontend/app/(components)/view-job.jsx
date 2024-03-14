"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobView({ updateJob, jobId, setCurrentJobOpen }) {
    const router = useRouter();
    const [userId, setUserId] = useState(getCookie("userId"));
    const [status, setStatus] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [stage, setStage] = useState("");
    const [deadline, setDeadline] = useState("");
    const [url, setUrl] = useState("");

    const putJob = async (refresh) => {
        const body = {
            title: title,
            company: company,
            location: location,
            salary: salary,
            description: description,
            stage: stage,
            deadline: deadline,
            url: url,
        };

        const headers = {
            "Content-Type": "application/json",
        };

        let response = await fetch(`jobs/${userId}/${jobId}`, {
            headers,
            credentials: "include",
            method: "PUT",
            body: JSON.stringify(body),
        });

        response.json().then((data) => {
            if ("error" in data) {
                setStatus(false);
            } else {
                setStatus(true);
                updateJob(data);
            }
        });

        refresh();
    };

    useEffect(() => {
        fetch(`http://localhost:3001/jobs/${userId}/${jobId}`, {
            credentials: "include",
            cache: "no-store",
        })
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setCompany(data.company);
                setLocation(data.location);
                setSalary(data.salary);
                setDescription(data.description);
                setStage(data.stage);
                setDeadline(data.deadline);
                setUrl(data.url);
            });
    }, []);

    return (
        <div>
            {!isEditing && (
                <div className="md:w-full w-[22rem]">
                    {title ? (
                        <div className="flex flex-col">
                            <table className="mb-5">
                                <tbody>
                                    <tr>
                                        <td>Job Title</td>
                                        <td>{title}</td>
                                    </tr>
                                    <tr>
                                        <td>Company</td>
                                        <td>{company}</td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>{location}</td>
                                    </tr>
                                    <tr>
                                        <td>Salary</td>
                                        <td>{salary}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{description}</td>
                                    </tr>
                                    <tr>
                                        <td>Stage</td>
                                        <td>{stage}</td>
                                    </tr>
                                    <tr>
                                        <td>URL</td>
                                        <td>
                                            <a
                                                href={url}
                                                className="text-blue-500"
                                            >
                                                {url}
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex flex-row justify-end items-baseline">
                                <div className="flex flex-row space-x-3">
                                    <button
                                        onClick={() => setCurrentJobOpen(null)}
                                        className="transition hover:text-blue-500 hover:bg-gray-200 text-black py-2 w-28 rounded-lg"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="transition text-white bg-blue-500 border hover:bg-blue-400 border-opacity-0 py-2 w-28 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading ...</div>
                    )}
                </div>
            )}
            {isEditing && (
                <div className="flex flex-col md:w-96 w-[22rem] lg:w-[32rem]">
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>Job Title</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            name="title"
                            type="text"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. Software Engineer"
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="mb-1">Company</label>
                        <input
                            name="company"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. Microsoft"
                            defaultValue={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="mb-1">Location</label>
                        <input
                            name="title"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. Seattle, WA"
                            defaultValue={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="mb-1">Expected Salary</label>
                        <input
                            name="title"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. 120,000 USD"
                            defaultValue={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="mb-1">Description</label>
                        <input
                            name="title"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. Entry level opening in Microsoft Teams"
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="mb-1">Stage</label>
                        <input
                            name="title"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. Interview (Round 3)"
                            defaultValue={stage}
                            onChange={(e) => setStage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="mb-1">Deadline</label>
                        <input
                            name="title"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. 2024-05-15"
                            defaultValue={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-1">URL</label>
                        <input
                            name="title"
                            type="text"
                            className="border border-gray-300 p-2.5 rounded-lg py-2"
                            placeholder="e.g. example.com/job/software-developer"
                            defaultValue={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between items-baseline">
                        <div>
                            {status === true && (
                                <p className="text-green-500">Job updated.</p>
                            )}
                            {status === false && (
                                <p className="text-red-500">
                                    Encountered error.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-row space-x-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="transition hover:text-blue-500 hover:bg-gray-200 text-black py-2 w-28 rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => putJob(router.refresh)}
                                className="transition text-white bg-blue-500 border hover:bg-blue-400 border-opacity-0 py-2 w-28 rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
