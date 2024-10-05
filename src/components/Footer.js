import React from 'react';
import SwiggyLogo from './Swiggy-1.png';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 pl-14 h-full">
            <div className="flex flex-col items-start pl-6">
                <img
                    src={SwiggyLogo}
                    alt="Swiggy Logo"
                    className="h-8 invert-white"
                />
                <p className="text-gray-400 text-sm mt-2">
                    © 2023 Bundl Technologies Pvt. Ltd
                </p>
            </div>
        </footer>
    );
};

export default Footer;
