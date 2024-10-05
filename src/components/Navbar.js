import React from "react";
import SwiggyLogo from './Swiggy-1.png';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between w-full px-4 sm:px-6 py-3 bg-white border-b border-gray-300 shadow-xl">
            <Link to={'/'} className="flex items-center h-32 sm:h-28 w-32 sm:w-48 mb-3 sm:mb-0">
                <img
                    src={SwiggyLogo}
                    alt="Swiggy Logo"
                    className="h-full w-full object-contain"
                />
            </Link>
            <div className="flex items-center border text-lg font-semibold border-gray-200 bg-gray-200 rounded-xl px-4 py-2 w-full sm:w-2/5">
                <input
                    type="text"
                    placeholder="Search for restaurant and food"
                    className="flex-grow text-gray-600 bg-gray-200 p-2 rounded focus:outline-none"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.15-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                    />
                </svg>
            </div>
        </nav>
    );
};

export default Navbar;
