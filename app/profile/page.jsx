"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../lib/actions";

export default function Profile() {
    const router = useRouter();

    const changePassword = () => {
        console.log("Not implemented yet");
    };

    const changeEmail = () => {
        console.log("Not implemented yet");
    };

    return (
        <div className="flex fixed overflow-y-scroll inset-x-0 justify-center w-screen h-screen">
            <div className="flex flex-col w-[30rem] xl:w-[40rem] space-y-5 rounded-lg pt-5">
                <div className="flex flex-col w-full bg-white p-5 rounded-lg">
                    <h1 className="text-2xl font-bold mb-3">Profile</h1>
                    <p className="text-gray-500">Welcome to your profile.</p>
                </div>
                <div className="flex flex-col w-full bg-white p-5 rounded-lg">
                    <h1 className="text-2xl font-bold mb-3">Change Password</h1>
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>Old Password</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            type="password"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>New Password</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            type="password"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>Confirm New Password</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            type="password"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                        />
                    </div>
                    <button
                        onClick={changePassword}
                        className="bg-blue-500 hover:bg-blue-600 transition ease-in-out text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Change Password
                    </button>
                </div>
                <div className="flex flex-col w-full bg-white p-5 rounded-lg">
                    <h1 className="text-2xl font-bold mb-3">Change Email</h1>
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>New Email</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            type="email"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                        />
                    </div>
                    <button
                        onClick={changeEmail}
                        className="bg-blue-500 hover:bg-blue-600 transition ease-in-out text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Change Email
                    </button>
                </div>
                <div className="flex flex-col w-full rounded-lg">
                    <form action={logout}>
                        <button className="bg-red-500 hover:bg-red-600 transition ease-in-out text-white font-bold py-2 px-4 rounded-lg">
                            <div>Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
