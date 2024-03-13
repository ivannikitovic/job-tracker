"use client";

import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();

    const logOut = () => {
        deleteCookie("authToken");
        deleteCookie("userId");
        router.push("/login");
    };

    return <button onClick={logOut}>Click here to log out.</button>;
}
