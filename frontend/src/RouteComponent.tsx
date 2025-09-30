import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/protected-components/ProtectedRoute";
import Dashboard from "pages/dashboard";
import Course from "pages/course";
import Profile from "pages/profile";
import ModuleDetail from "pages/modules/ModuleDetail";
import NotFound from "pages/not-found";
import EnrollCourse from "pages/enroll-course";
import Lesson from "pages/lesson";
import Authentication from "pages/authentication";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/enroll" element={<EnrollCourse />} />
        <Route path="/enroll/:courseId" element={<Lesson />} />
        <Route path="/courses" element={<Course />}>
          <Route
            path=":courseId/modules/:moduleId"
            element={<ModuleDetail />}
          />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
