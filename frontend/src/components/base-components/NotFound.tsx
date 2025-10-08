import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUserAuth } from "hooks/useCurrentUserAuth";

import image from "assets/not-found.jpg";

const NotFoundComponent: React.FC = () => {
  const { isAuthenticated } = useCurrentUserAuth();

  return (
    <div className="flex flex-col w-full h-screen justify-between">
      <img
        src={image}
        className="w-1/2 h-1/2 object-contain flex self-center"
      />
      <div className="flex flex-col items-center justify-center h-screen text-center h-1/2">
        <h1 className="text-9xl text-gray-800 font-rubik-glitch">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <Link
          to={isAuthenticated ? "/" : "/auth"}
          className="mt-6 px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-darkPrimaryColor"
        >
          Return To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
