"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        const body = {
            email: email,
            password: password,
        };

        let response = await fetch(`http://localhost:3001/user/login`, {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        });

        response = await response.json();

        if ("token" in response) {
            setCookie("authToken", response.token, {
                // httpOnly: true, TODO: add secure cookies
                // secure: true,
            });
            setCookie("userId", response.userId);

            setTimeout(1000); // TODO: figure out why delay is needed
            router.push("/");
        } else if ("error" in response) {
            console.log(response.error);
        }
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
                        onClick={login}
                        className="bg-blue-500 text-white p-2.5 rounded-lg"
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}
