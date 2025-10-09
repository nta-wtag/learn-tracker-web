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
      <Route path={ROUTES.AUTH} element={<Authentication />} />
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ENROLL} element={<EnrollCourse />} />
        <Route path={ROUTES.ENROLL_COURSE} element={<Lessons />} />
        <Route path={ROUTES.COURSES} element={<Courses />}>
          <Route
            path={ROUTES.COURSE_MODULE}
            element={<ModuleDetail />}
          />
        </Route>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default RouteComponent;
