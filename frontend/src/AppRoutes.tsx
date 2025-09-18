import { Routes, Route } from "react-router-dom";
import AuthPage from "@pages/AuthPage";
import MenteeDashboard from "@pages/Mentee/MenteeDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/mentee" element={<MenteeDashboard />} />
    </Routes>
  );
}
