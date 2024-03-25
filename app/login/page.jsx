"use client";

import { authenticate } from "../../lib/actions";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async () => {
        await authenticate(null, { email, password });
    };

    return (
        <div className="flex fixed overflow-y-scroll inset-x-0 justify-center w-screen h-screen">
            <div className="flex flex-col m-auto w-[20rem] md:w-[30rem] space-y-5 rounded-lg">
                <div className="flex flex-col w-full bg-white p-5 rounded-lg">
                    <h1 className="text-2xl font-bold mb-3">Login</h1>
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>Email</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            type="email"
                            name="email"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <div className="flex flex-row justify-between mb-1">
                            <label>Password</label>
                            <p className="text-gray-500">Required</p>
                        </div>
                        <input
                            type="password"
                            name="password"
                            className="border w-full border-gray-300 p-2.5 rounded-lg py-2"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={logIn}
                        className="bg-blue-500 text-white p-2.5 rounded-lg"
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}
