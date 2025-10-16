import { Routes, Route } from "react-router-dom";
import AuthPage from "pages/AuthPage";
import PrivateRoute from "components/PrivateRoute";
import DashboardPage from "pages/DashboardPage";
import CoursesPage from "pages/CoursePage";
import ProfilePage from "pages/ProfilePage";
import ModuleDetail from "pages/modules/ModuleDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <CoursesPage />
          </PrivateRoute>
        }
      >
        <Route path=":courseId/modules/:moduleId" element={<ModuleDetail />} />
      </Route>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}