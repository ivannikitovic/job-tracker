import { cookies } from "next/headers";

export default function Login() {
    const login = async (email, password) => {
        "use server";

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
        "use server";
        const email = formData.get("email");
        const password = formData.get("password");
        const response = await login(email, password);

        if ("token" in response) {
            cookies().set({
                name: "jwt",
                value: response.token,
                httpOnly: true,
            });
            cookies().set({
                name: "userId",
                value: response.userId,
                httpOnly: true,
            });
        } else if ("error" in response) {
            console.log(response.error);
        }
    };

    return (
        <div>
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
