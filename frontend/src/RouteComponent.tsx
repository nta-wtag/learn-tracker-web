import { Routes, Route } from "react-router-dom";
import Authentication from "pages/authentication";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  );
}
