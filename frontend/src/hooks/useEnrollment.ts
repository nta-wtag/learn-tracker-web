import { useState, useCallback } from "react";
import { enrollCourseForCurrentUser, isEnrolled as checkEnrollment } from "utils/course-storage";

interface EnrollmentResult {
    success: boolean;
    message: string;
}

export const useEnrollment = (courseName: string) => {
    const [isEnrolled, setIsEnrolled] = useState(checkEnrollment(courseName));

    const enroll = useCallback((): EnrollmentResult => {
        const message = enrollCourseForCurrentUser(courseName);

        if (message.includes("successfully")) {
            setIsEnrolled(true);
            return { success: true, message };
        }

        return { success: false, message };
    }, [courseName]);

    return { isEnrolled, enroll };
};
