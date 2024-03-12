"use client";

import { deleteCookie } from "cookies-next";
import React from "react";

export default function Profile() {
    const logOut = () => {
        deleteCookie("authToken");
        deleteCookie("userId");
    };

    return <button onClick={logOut}>Click here to log out.</button>;
}
