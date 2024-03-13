"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const login = async (email, password) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const body = {
            email: email,
            password: password,
        };

        let jobs = await fetch(`http://localhost:3001/user/login`, {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        });

        return jobs.json();
    };

    const create = async (formData) => {
        const email = formData.get("email");
        const password = formData.get("password");
        const response = await login(email, password);

        if ("token" in response) {
            setCookie("authToken", response.token, {
                // httpOnly: true, TODO: add secure cookies
                // secure: true,
            });
            setCookie("userId", response.userId);

            router.push("/");
        } else if ("error" in response) {
            console.log(response.error);
        }
    };

    return (
        <div className="m-5">
            <form action={create}>
                <input className="border" type="email" name="email" />
                <input className="border" type="password" name="password" />
                <button className="border" type="submit">
                    Log In
                </button>
            </form>
        </div>
    );
}
