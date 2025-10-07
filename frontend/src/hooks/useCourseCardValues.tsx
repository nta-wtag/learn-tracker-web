import React, { createContext, useContext } from "react";

interface CourseCardValues {
  totalLessons: number;
  totalDays: number;
  deadline: string | null;
  isDeadlineOver: boolean;
  courseName: string;
  daysLeft?: number;
  isCompleted?: boolean;
}

const CourseCardContext = createContext<CourseCardValues | undefined>(undefined);

export const useCourseCardValues = () => {
  const context = useContext(CourseCardContext);
  if (!context) throw new Error("useCourseCardValues must be used within CourseCardProvider");
  return context;
};

interface Props {
  values: CourseCardValues;
  children: React.ReactNode;
}

export const CourseCardProvider: React.FC<Props> = ({ values, children }) => (
  <CourseCardContext.Provider value={values}>{children}</CourseCardContext.Provider>
);
