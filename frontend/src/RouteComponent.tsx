import { Routes, Route } from "react-router-dom";
import AuthPage from "pages/AuthPage";
import ProtectedRoute from "components/ProtectedRoute";
import DashboardPage from "pages/DashboardPage";
import CoursePage from "pages/CoursePage";
import ProfilePage from "pages/ProfilePage";
import ModuleDetail from "pages/modules/ModuleDetail";
import NotFoundPage from "pages/NotFoundPage";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/courses"
          element={
              <CoursePage />
          }
        >
          <Route path=":courseId/modules/:moduleId" element={<ModuleDetail />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
