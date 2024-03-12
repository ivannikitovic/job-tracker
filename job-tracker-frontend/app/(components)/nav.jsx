"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/next.svg";
import { getCookie } from "cookies-next";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    let userId = getCookie("userId");

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="lg:hidden">
                <button onClick={openMenu}>open menu</button>
            </div>
            <div
                className={`h-full lg:flex lg:relative fixed ${
                    isOpen ? "" : "hidden"
                } flex-col w-64 border-r bg-white border-gray-300`}
            >
                <div className="p-8 flex justify-center border-b border-gray-300">
                    <Image src={logo} width={128} alt="Job Tracker"></Image>
                </div>
                <Link
                    href={`/`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-100 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    My Jobs
                </Link>
                <Link
                    href={`/add-job`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-100 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    Add Job
                </Link>
                <Link
                    href={`/login`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-100 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    Login
                </Link>
                <Link
                    href={`/profile`}
                    onClick={closeMenu}
                    className="p-4 flex justify-center hover:bg-gray-100 hover:text-blue-500 transition ease-in-out rounded-lg m-1 mb-0"
                >
                    My Profile
                </Link>
            </div>
            {isOpen && (
                <div className="lg:hidden ml-64 bg-gray-500 w-full h-full fixed bg-opacity-50">
                    <button className="m-5" onClick={closeMenu}>
                        close menu
                    </button>
                </div>
            )}
        </>
    );
}
