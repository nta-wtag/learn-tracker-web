import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/protected-components/ProtectedRoute";
import Dashboard from "pages/dashboard";
import Courses from "pages/courses";
import Profile from "pages/profile";
import ModuleDetail from "pages/modules/module-detail";
import NotFound from "pages/not-found";
import EnrollCourse from "pages/enroll-course";
import Lessons from "pages/lessons";
import Authentication from "pages/authentication";

import { ROUTES } from "routes/paths";

const RouteComponent: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.AUTH.path} element={<Authentication />} />
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path={ROUTES.DASHBOARD.path} element={<Dashboard />} />
        <Route path={ROUTES.ENROLL.path} element={<EnrollCourse />} />
        <Route path={ROUTES.ENROLL_COURSE.path} element={<Lessons />} />
        <Route path={ROUTES.COURSES.path} element={<Courses />}>
          <Route
            path={ROUTES.COURSE_MODULE.path}
            element={<ModuleDetail />}
          />
        </Route>
        <Route path={ROUTES.PROFILE.path} element={<Profile />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND.path} element={<NotFound />} />
    </Routes>
  );
};

export default RouteComponent;
