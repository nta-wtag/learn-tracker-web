import React from 'react';
import { useParams } from 'react-router-dom';

function ModuleDetail(props) {
    const {courseId, moduleId} = useParams()
    return (
        <div>
            Module {moduleId} for Course {courseId}
        </div>
    );
}

export default ModuleDetail;
