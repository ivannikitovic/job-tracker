"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";

export default function JobView({
    updateJob,
    removeJob,
    jobId,
    setCurrentJobOpen,
}) {
    const router = useRouter();
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

    const [titleMissing, setTitleMissing] = useState(false);
    const [companyMissing, setCompanyMissing] = useState(false);
    const [locationMissing, setLocationMissing] = useState(false);
    const [stageMissing, setStageMissing] = useState(false);

    const putJob = async (refresh) => {
        const body = {
            title: title,
            company: company,
            location: location,
            salary: salary || " ",
            description: description || " ",
            stage: stage,
            deadline: deadline || " ",
            url: url || " ",
        };

        setTitleMissing(false);
        setCompanyMissing(false);
        setLocationMissing(false);
        setStageMissing(false);

        if (!(title && company && location && stage)) {
            if (!title) {
                setTitleMissing(true);
            }

            if (!company) {
                setCompanyMissing(true);
            }

            if (!location) {
                setLocationMissing(true);
            }

            if (!stage) {
                setStageMissing(true);
            }

            return;
        }

        const headers = {
            "Content-Type": "application/json",
        };

        let response = await fetch(`api/jobs/${jobId}`, {
            headers,
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

        setIsEditing(false);
        refresh();
    };

    const deleteJob = async () => {
        let response = await fetch(`api/jobs/${jobId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            removeJob(jobId);
        }
    };

    useEffect(() => {
        fetch(`api/jobs/${jobId}`, {
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
        <div className="flex flex-col w-96 md:h-auto lg:w-[32rem]">
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Job Title</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    disabled={!isEditing}
                    name="title"
                    type="text"
                    className={`border w-full ${
                        titleMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2`}
                    placeholder="e.g. Software Engineer"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Company</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    disabled
                    name="company"
                    type="text"
                    className={`border w-full ${
                        companyMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 text-gray-400 rounded-lg py-2`}
                    placeholder="e.g. Microsoft"
                    defaultValue={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Location</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    disabled={!isEditing}
                    name="location"
                    type="text"
                    className={`border w-full ${
                        locationMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2`}
                    placeholder="e.g. Seattle, WA"
                    defaultValue={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label>Expected Salary</label>
                <input
                    disabled={!isEditing}
                    name="salary"
                    type="text"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. 120,000 USD"
                    defaultValue={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label>Description</label>
                <textarea
                    disabled={!isEditing}
                    name="description"
                    type="text"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. Entry level opening in Microsoft Teams"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Stage</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <select
                    disabled={!isEditing}
                    name="stage"
                    type="text"
                    className={`border w-full ${
                        stageMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2 appearance-none`}
                    placeholder="e.g. Interview (Round 3)"
                    onChange={(e) => setStage(e.target.value)}
                >
                    <option value=""></option>
                    <option value="wishlist" selected={stage === "wishlist"}>
                        Wishlist
                    </option>
                    <option value="applied" selected={stage === "applied"}>
                        Applied
                    </option>
                    <option value="screen" selected={stage === "screen"}>
                        Phone Screen
                    </option>
                    <option value="oa" selected={stage === "oa"}>
                        Online Assessment
                    </option>
                    <option value="interview" selected={stage === "interview"}>
                        Interview
                    </option>
                    <option value="offer" selected={stage === "offer"}>
                        Offer
                    </option>
                    <option value="rejection" selected={stage === "rejection"}>
                        Rejection
                    </option>
                    <option value="archive" selected={stage === "archive"}>
                        Archive
                    </option>
                </select>
            </div>
            <div className="flex flex-col mb-3">
                <label>Deadline</label>
                <input
                    disabled={!isEditing}
                    name="deadline"
                    type="date"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. 2024-05-15"
                    defaultValue={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col mb-5">
                <label>URL</label>
                <input
                    disabled={!isEditing}
                    name="url"
                    type="url"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. example.com/job/software-developer"
                    defaultValue={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-row justify-between items-middle">
                {isEditing && (
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                            deleteJob();
                            setCurrentJobOpen("");
                        }}
                    >
                        <GoTrash size={24} />
                    </button>
                )}
                <div>
                    {status === true && (
                        <p className="text-green-500">Job added.</p>
                    )}
                    {status === false && (
                        <p className="text-red-500">Encountered error.</p>
                    )}
                </div>
                <div className="flex flex-row space-x-3">
                    {isEditing ? (
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setCurrentJobOpen("");
                            }}
                            className="transition text-white bg-red-500 hover:bg-red-400 py-2 w-28 rounded-lg"
                        >
                            Close
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentJobOpen("")}
                            className="transition hover:text-blue-500 hover:bg-gray-200 text-black py-2 w-28 rounded-lg"
                        >
                            Close
                        </button>
                    )}
                    {isEditing ? (
                        <button
                            onClick={() => putJob(router.refresh)}
                            className="transition text-white bg-green-500 hover:bg-green-400 py-2 w-28 rounded-lg"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="transition text-white bg-blue-500 hover:bg-blue-400 py-2 w-28 rounded-lg"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
