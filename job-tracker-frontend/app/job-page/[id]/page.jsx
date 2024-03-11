"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [job, setJob] = useState(null);

    const userId = getCookie("userId");

    useEffect(() => {
        fetch(`http://localhost:3001/jobs/${userId}/${params.id}`, {
            credentials: "include",
            cache: "no-store",
        })
            .then((response) => response.json())
            .then((data) => {
                setJob(data);
            });
    }, []);

    return (
        <>
            {job && (
                <table>
                    <tbody>
                        <tr>
                            <td>Job Title</td>
                            <td>{job.title}</td>
                        </tr>
                        <tr>
                            <td>Company</td>
                            <td>{job.company}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>{job.location}</td>
                        </tr>
                        <tr>
                            <td>Salary</td>
                            <td>{job.salary}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{job.description}</td>
                        </tr>
                        <tr>
                            <td>Stage</td>
                            <td>{job.stage}</td>
                        </tr>
                        <tr>
                            <td>URL</td>
                            <td>
                                <a href={job.url} className="text-blue-500">
                                    {job.url}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    );
}
