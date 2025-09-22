import React from "react";
import Card from "components/protected-components/Card";
import RecentActivity from "components/protected-components/RecentActivity";
import { BookOpen, CheckCircle, Flame } from "lucide-react";

const mockActivities = [
  {
    id: "1",
    type: "lessonCompleted",
    courseId: "course1",
    moduleId: "module3",
    lessonId: "lesson7",
    description: "Completed Lesson 7 in React Basics",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "moduleStarted",
    courseId: "course2",
    moduleId: "module1",
    description: "Started Module 1 in Advanced JavaScript",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "noteAdded",
    courseId: "course1",
    moduleId: "module2",
    description: "Added notes to Module 2 in React Basics",
    timestamp: "3 days ago",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        title="Courses Enrolled" 
        value={5} 
        icon={<BookOpen />} 
      />
      <Card 
        title="Lessons Completed" 
        value={42} 
        icon={<CheckCircle />} 
      />
      <Card 
        title="Current Streak" 
        value="7 days" 
        icon={<Flame />} 
      />
    </div>

      {/* Recent Activity */}
      <RecentActivity activities={mockActivities} />
    </div>
  );
};

export default Dashboard;
