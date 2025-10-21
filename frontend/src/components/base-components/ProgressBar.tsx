import React from "react";
import classNames from "classnames";

interface Props {
  progressPercent: number;
  className?: string;
  height?: number;
}

const ProgressBar: React.FC<Props> = ({
  progressPercent,
  className,
  height = 10,
}) => {
  // Determine color based on progress
  const getProgressColor = (percent: number) => {
    if (percent < 40) return "bg-red-500";
    if (percent < 70) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center my-2">
        <p className="text-gray-600">Progress</p>
        <p>{Math.round(progressPercent)}%</p>
      </div>

      <div
        className={classNames(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          className
        )}
        style={{ height }}
      >
        <div
          className={classNames(
            getProgressColor(progressPercent),
            "rounded-full transition-all duration-300"
          )}
          style={{ width: `${progressPercent}%`, height }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
