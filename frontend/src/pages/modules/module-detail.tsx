import React from 'react';
import { useParams } from 'react-router-dom';

const ModuleDetail: React.FC = () => {
    const {courseId, moduleId} = useParams()
    return (
        <div>
            Module {moduleId} for Course {courseId}
        </div>
    );
}

export default ModuleDetail;
