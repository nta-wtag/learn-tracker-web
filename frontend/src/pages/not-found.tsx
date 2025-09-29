import React from "react";
<<<<<<< HEAD
import NotFoundComponent from "components/base-components/NotFound";

const NotFound = () => {
    return (
        <NotFoundComponent/>
=======
import { Link } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

import image from 'assets/istockphoto-1366754976-612x612.jpg'

const NotFound = () => {
    const isAuthenticated = useAuth();
    return (
        <div className="flex flex-col w-full h-screen justify-between">
            <img src={image} className="w-1/2 h-1/2 object-contain flex self-center" />
            <div className="flex flex-col items-center justify-center h-screen text-center h-1/2">
                <h1 className="text-9xl text-gray-800 font-rubik-glitch">404</h1>
                <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
                <Link
                    to={isAuthenticated ? "/dashboard" : "/auth"}
                    className="mt-6 px-4 py-2 bg-[#6b3dcb] text-white rounded-lg hover:bg-[#5a2dbd]"
                >
                    Go Home
                </Link>
            </div>
        </div>
>>>>>>> a0c050e612644f4b805dcf9b28c654b5a24576ba
    );
};

export default NotFound;
