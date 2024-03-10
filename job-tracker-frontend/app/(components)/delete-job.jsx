"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default async function DeleteJob({ job_id }) {
    const router = useRouter();

    const deleteJob = async () => {
        const headers = { Authorization: `Bearer ${process.env.BEARER_TOKEN}` };
        let response = await fetch(
            `http://localhost:3001/jobs/${process.env.USER_ID}/${job_id}`,
            {
                headers,
                method: "DELETE",
            }
        );

        if (response.ok) {
            router.refresh();
        }
    };

    return (
        <button className="ml-3 text-red-500" onClick={deleteJob}>
            X
        </button>
    );
}
