import React from "react";

interface Props {
    progressPercent: number;
    className?: string;
    height?: number;
    completedModules: number;  
    totalModules:number
}

const ProgressBar: React.FC<Props> = ({ progressPercent, className = "", height = 6, completedModules,  totalModules}) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                    Overall Progress: {Math.round(progressPercent)}%
                </p>
                <p className="text-sm text-gray-500">
                    {completedModules}/{totalModules} modules
                </p>
            </div>
            <div
                className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
                style={{ height }}
            >
                <div
                    className="bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%`, height }}
                />
            </div>
        </div>

    );
};

export default ProgressBar;
