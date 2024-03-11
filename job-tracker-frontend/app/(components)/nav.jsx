import Link from "next/link";
import React from "react";

export default function Nav() {
    return (
        <div className="mb-5">
            <Link href={`/`} className="text-blue-500">
                My Jobs
            </Link>
            <Link href={`/add-job`} className="text-blue-500 ml-5">
                Add Job
            </Link>
            <Link href={`/login`} className="text-blue-500 ml-5">
                Login
            </Link>
        </div>
    );
}
