import React from "react";

const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-[#6b3dcb] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default LoadingScreen;
