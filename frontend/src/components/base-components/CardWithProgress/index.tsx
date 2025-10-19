import { CalendarClock } from "lucide-react";

interface CardWithProgressProps {
  course: string;
  progressPercent: number;
  deadline?: string;
  daysLeft?: number;
  image: string;
}

const CardWithProgress: React.FC<CardWithProgressProps> = ({
  course,
  progressPercent,
  deadline,
  daysLeft,
  image,
}) => {
  const radius = 50;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (progressPercent / 100) * circumference;

  let strokeColor = "#10b981"; // green
  if (progressPercent < 40)
    strokeColor = "#ef4444"; // red
  else if (progressPercent < 70) strokeColor = "#f59e0b"; // orange

  return (
    <div className="p-4 shadow-lg w-full rounded-lg bg-white flex items-center justify-between gap-6 font-poppins">
      <div className="flex items-center gap-4">
        <img src={image} alt={course} className="w-16 h-16" />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-gray-600 text-2xl font-poppins ">
            {course}
          </span>
          {deadline && (
            <div
              className={`text-sm font-lato flex gap-2 items-center ${
                daysLeft !== undefined
                  ? daysLeft < 7
                    ? "text-red-600"
                    : daysLeft < 14
                      ? "text-yellow-600"
                      : "text-green-600"
                  : "text-gray-600"
              }`}
            >
              <CalendarClock size={16} />
              <span>{deadline}</span>
            </div>
          )}
        </div>
      </div>
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        <span className="absolute text-sm font-semibold text-gray-800">
          {progressPercent.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default CardWithProgress;
