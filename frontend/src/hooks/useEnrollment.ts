import { useState, useCallback } from "react";
import { enrollCourseForCurrentUser, isEnrolled as checkEnrollment } from "utils/course-handler";

interface EnrollmentResult {
    success: boolean;
    message: string;
}

export const useEnrollment = (courseName: string) => {
    const [isEnrolled, setIsEnrolled] = useState(checkEnrollment(courseName));

    const enroll = useCallback((): EnrollmentResult => {
        const message = enrollCourseForCurrentUser(courseName);

        if (message.includes("Successfully")) {
            setIsEnrolled(true);
            return { success: true, message };
        }

        if (message.includes("Already enrolled")) {
            return { success: false, message };
        }

        return { success: false, message };
    }, [courseName]);

    return { isEnrolled, enroll };
};
