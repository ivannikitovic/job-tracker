"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function AddJob({ addJob, setAddJobOpen }) {
    const router = useRouter();
    const [userId, setUserId] = useState(getCookie("userId"));
    const [status, setStatus] = useState(null);

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

    const postJob = async (refresh) => {
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
                addJob(data);
            }
        });

        router.refresh();
    };

    return (
        <div className="flex flex-col w-96 md:h-auto lg:w-[32rem]">
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Job Title</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    name="title"
                    type="text"
                    className={`border w-full ${
                        titleMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2`}
                    placeholder="e.g. Software Engineer"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Company</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    name="company"
                    type="text"
                    className={`border w-full ${
                        companyMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2`}
                    placeholder="e.g. Microsoft"
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Location</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <input
                    name="location"
                    type="text"
                    className={`border w-full ${
                        locationMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2`}
                    placeholder="e.g. Seattle, WA"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label>Expected Salary</label>
                <input
                    name="salary"
                    type="text"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. 120,000 USD"
                    onChange={(e) => setSalary(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label>Description</label>
                <textarea
                    name="description"
                    type="text"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. Entry level opening in Microsoft Teams"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <div className="flex flex-row justify-between mb-1">
                    <label>Stage</label>
                    <p className="text-gray-500">Required</p>
                </div>
                <select
                    name="stage"
                    type="text"
                    className={`border w-full ${
                        stageMissing ? "outline outline-red-500" : ""
                    } border-gray-300 p-2.5 rounded-lg py-2 appearance-none`}
                    placeholder="e.g. Interview (Round 3)"
                    onChange={(e) => setStage(e.target.value)}
                >
                    <option value=""></option>
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="screen">Phone Screen</option>
                    <option value="oa">Online Assessment</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejection">Rejection</option>
                    <option value="archive">Archive</option>
                </select>
            </div>
            <div className="flex flex-col mb-3">
                <label>Deadline</label>
                <input
                    name="deadline"
                    type="date"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. 2024-05-15"
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col mb-5">
                <label>URL</label>
                <input
                    name="url"
                    type="url"
                    className="border border-gray-300 p-2.5 rounded-lg py-2"
                    placeholder="e.g. example.com/job/software-developer"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-row justify-between items-baseline">
                <div>
                    {status === true && (
                        <p className="text-green-500">Job added.</p>
                    )}
                    {status === false && (
                        <p className="text-red-500">Encountered error.</p>
                    )}
                </div>
                <div className="flex flex-row space-x-3">
                    <button
                        onClick={() => setAddJobOpen(false)}
                        className="transition text-white bg-red-500 hover:bg-red-400 py-2 w-28 rounded-lg"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => postJob(router.refresh)}
                        className="transition text-white bg-green-500 hover:bg-green-400 py-2 w-28 rounded-lg"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
