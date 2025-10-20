import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import image from "assets/not-found.jpg";
import { ROUTES } from "routes/paths";

const NotFoundComponent: React.FC = () => {
    const {isAuthenticated} = useAuth();

    return (
        <div className="flex flex-col w-full h-screen justify-between">
            <img src={image} className="w-1/2 h-1/2 object-contain flex self-center" data-testid="404-img" />
            <div className="flex flex-col items-center justify-center h-screen text-center h-1/2">
                <h1 className="text-9xl text-gray-800 font-rubik-glitch">404</h1>
                <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
                <Link
                    to={isAuthenticated ? ROUTES.DASHBOARD.path : ROUTES.AUTH.path}
                    className="mt-6 px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-darkPrimaryColor"
                    data-testid="go-home-link"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundComponent;
