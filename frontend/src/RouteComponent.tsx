import { Routes, Route } from "react-router-dom";
import AuthPage from "pages/AuthPage";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
}
