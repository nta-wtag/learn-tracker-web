import React from "react";
import { useParams } from "react-router-dom";

const ModuleDetail: React.FC = () => {
  const { courseId, moduleId } = useParams();
  return (
    <>
      Module {moduleId} for Course {courseId}
    </>
  );
};

export default ModuleDetail;
