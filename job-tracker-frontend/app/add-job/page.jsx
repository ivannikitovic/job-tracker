"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function Page() {
    const router = useRouter();
    const [status, setStatus] = useState(null);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [stage, setStage] = useState("");
    const [deadline, setDeadline] = useState("");
    const [url, setUrl] = useState("");

    const userId = getCookie("userId");

    const addJob = async (refresh) => {
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

        let response = await fetch(`jobs/${userId}`, {
            headers,
            credentials: "include",
            method: "POST",
            body: JSON.stringify(body),
        });

        response.json().then((data) => {
            if ("error" in data) {
                setStatus(false);
            } else {
                setStatus(true);
            }
        });

        refresh();
    };

    return (
        <div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Job Title</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    name="title"
                    type="text"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. Software Engineer"
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
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col mb-3">
                <label className="mb-1">URL</label>
                <input
                    name="title"
                    type="text"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. example.com/job/software-developer"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-row items-baseline">
                <button
                    onClick={() => addJob(router.refresh)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Add
                </button>
                <div className="ml-5">
                    {status === true && (
                        <p className="text-green-500">
                            Job added successfully.
                        </p>
                    )}
                    {status === false && (
                        <p className="text-red-500">
                            Encountered error while adding job.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
