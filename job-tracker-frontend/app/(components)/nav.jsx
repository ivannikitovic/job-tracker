"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/next.svg";
import { getCookie } from "cookies-next";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(getCookie("userId"));

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="flex h-screen fixed justify-center lg:hidden">
                <button
                    className="m-auto opacity-60 hover:opacity-100 transition pt-5 pb-5 pr-2 pl-2 rounded-r-lg bg-gray-300"
                    onClick={openMenu}
                >
                    &gt;
                </button>
            </div>
            <div
                className={`h-full lg:flex lg:relative fixed ${
                    isOpen ? "" : "hidden"
                } flex-col w-64 lg:border-r bg-white lg:border-gray-300`}
            >
                <div className="p-8 flex justify-center border-b border-gray-300">
                    <Image src={logo} width={128} alt="Job Tracker"></Image>
                </div>
                <Link
                    href={`/`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-300 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    My Jobs
                </Link>
                <Link
                    href={`/add-job`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-300 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    Add Job
                </Link>
                <Link
                    href={`/login`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-300 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    Login
                </Link>
                <Link
                    href={`/profile`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-300 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    My Profile
                </Link>
            </div>
            {isOpen && (
                <div className="lg:hidden ml-64 bg-gray-500 w-full h-full fixed bg-opacity-50">
                    <div className="flex h-screen fixed justify-center lg:hidden">
                        <button
                            className="m-auto opacity-100 hover:opacity-60 transition pt-5 pb-5 pr-2 pl-2 rounded-r-lg bg-white"
                            onClick={closeMenu}
                        >
                            &lt;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
