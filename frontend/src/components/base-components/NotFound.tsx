import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUserAuth } from "hooks/useCurrentUserAuth";
import { ROUTES } from "routes/paths";
import image from "assets/not-found.jpg";

const NotFoundComponent: React.FC = () => {
  const { isAuthenticated } = useCurrentUserAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <img
        src={image}
        alt="Page not found illustration"
        className="w-full max-w-md h-auto object-contain mb-8"
      />
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-600 font-poppins">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <Link
          to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}
          className="inline-block mt-6 px-6 py-3 bg-primaryColor text-white rounded-lg hover:bg-darkPrimaryColor transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
