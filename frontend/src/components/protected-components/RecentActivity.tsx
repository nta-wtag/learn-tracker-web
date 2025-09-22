import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, PlayCircle, StickyNote } from "lucide-react";

interface Activity {
  id: string;
  type: "lessonCompleted" | "moduleStarted" | "noteAdded";
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const iconMap = {
  lessonCompleted: <CheckCircle className="text-green-500" />,
  moduleStarted: <PlayCircle className="text-blue-500" />,
  noteAdded: <StickyNote className="text-purple-500" />,
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const navigate = useNavigate();

  const handleClick = (activity: Activity) => {
    if (activity.lessonId) {
      navigate(`/courses/${activity.courseId}/modules/${activity.moduleId}/lessons/${activity.lessonId}`);
    } else if (activity.moduleId) {
      navigate(`/courses/${activity.courseId}/modules/${activity.moduleId}`);
    } else {
      navigate(`/courses/${activity.courseId}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              onClick={() => handleClick(activity)}
              className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex-shrink-0">{iconMap[activity.type]}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;
