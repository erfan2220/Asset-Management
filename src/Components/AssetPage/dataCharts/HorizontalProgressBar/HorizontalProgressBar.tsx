// HorizontalProgressBar.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ProgressBarData {
    name: string;
    value: number;
    color: string;
}

interface HorizontalProgressBarProps {
    data: ProgressBarData[];
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            {
                label: 'Progress',
                data: data.map(item => item.value),
                backgroundColor: data.map(item => item.color),
                barThickness: 20
            }
        ]
    };

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        return `Value: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default HorizontalProgressBar;
