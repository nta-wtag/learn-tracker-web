import { Routes, Route } from "react-router-dom";
import Authentication from "pages/authentication";
import type React from "react";

const RouteComponent:React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  );
}

export default RouteComponent;
