"use client";

import { GoPlus } from "react-icons/go";
import { GoShare } from "react-icons/go";
import { GoTable } from "react-icons/go";

export default function ActionBar({ addJobOpen, setAddJobOpen }) {
    const toggleJobOpen = () => {
        setAddJobOpen(!addJobOpen);
    };
    return (
        <div className="flex flex-row fixed inset-x-0 bottom-10 justify-center">
            <div className="flex pl-5 pr-5 pt-1 pb-1 rounded-full bg-blue-500 text-white space-x-5">
                <button
                    className="flex flex-col items-center hover:text-gray-300 hover:bg-gray-500 hover:bg-opacity-50 rounded-full pl-5 pr-5 p-3"
                    onClick={toggleJobOpen}
                >
                    <GoPlus size={24} />
                    <h1>Add</h1>
                </button>
                <button
                    className="flex flex-col items-center hover:text-gray-300 hover:bg-gray-500 hover:bg-opacity-50 rounded-full pl-5 pr-5 p-3"
                    onClick={toggleJobOpen}
                >
                    <GoTable size={24} />
                    <h1>Chart</h1>
                </button>
                <button
                    className="flex flex-col items-center hover:text-gray-300 hover:bg-gray-500 hover:bg-opacity-50 rounded-full pl-5 pr-5 p-3"
                    onClick={toggleJobOpen}
                >
                    <GoShare size={24} />
                    <h1>Export</h1>
                </button>
            </div>
        </div>
    );
}
