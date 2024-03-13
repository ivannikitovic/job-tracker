"use client";

import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();

    const logOut = () => {
        router.push("/login");
        deleteCookie("authToken");
        deleteCookie("userId");
    };

    return <button onClick={logOut}>Click here to log out.</button>;
}
