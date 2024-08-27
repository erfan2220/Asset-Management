// CircularProgressBar.tsx
import React from 'react';

interface ProgressBarData {
    value: number; // Percentage value (0-100)
    color: string; // Color for the progress stroke
    label: string; // Label to display below the progress bar
}

interface CircularProgressBarProps {
    data: ProgressBarData[];
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ data }) => {
    const radius = 40; // Radius of the largest circle
    const strokeWidth = 10; // Width of the progress stroke
    const circleGap = 10; // Gap between circles
    const diameter = (radius + (data.length - 1) * (strokeWidth + circleGap)) * 2;

    const circles = data.map((item, index) => {
        const offset = index * (strokeWidth + circleGap);
        const circumference = 2 * Math.PI * (radius + offset);
        const strokeDashoffset = circumference - (item.value / 100) * circumference;

        return (
            <circle
                key={index}
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius + offset}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                fill="none"
                transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
            />
        );
    });

    return (
        <div className="relative flex flex-col items-center overflow-visible">
            <svg width={diameter+30} height={diameter+30} viewBox={`0 0 ${diameter+30} ${diameter}`}>
                {circles}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-800"></p> {/* Show value of the outermost progress */}
            </div>
            <p className="mt-2 text-sm text-gray-600">{data[0]?.label}</p> {/* Show label of the outermost progress */}
        </div>
    );
};

export default CircularProgressBar;
