"use client";

import { getCookie } from "cookies-next";
import React from "react";
import { GoTrash } from "react-icons/go";

export default function DeleteJob({ jobId, removeJob }) {
    const userId = getCookie("userId");

    const deleteJob = async () => {
        let response = await fetch(
            `http://localhost:3001/jobs/${userId}/${jobId}`,
            {
                credentials: "include",
                method: "DELETE",
            }
        );

        if (response.ok) {
            removeJob(jobId);
        }
    };

    return (
        <button className="text-red-500 hover:text-red-700" onClick={deleteJob}>
            <GoTrash size={24} />
        </button>
    );
}
