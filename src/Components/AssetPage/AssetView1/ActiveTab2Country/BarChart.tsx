import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () =>
{
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <div className="w-[full] mt-[16px] mb-[18px] mx-[19px]">

            <div className="flex items-center justify-between w-full border-[1px] border-[#0000001A] pt-[16px] px-[20px]">
                <div className="flex flex-row items-center">
                    <h2 className="text-[18px] font-[600] text-[#212121]">Financial Statistics per Technology</h2>
                    <span className="text-[12px]  text-[#424242] text-nowrap">(میلیون تومان)</span>
                </div>

                <div className="flex flex-row items-center gap-[3px] p-[6px] bg-[#fafafaa] border-[1px] border-[#e0e0e0] rounded-[4px]">
                    <div className="p-[5px]">
                        <img src="./images/Asset/map/View1/ListBullets.svg" alt=""/>
                    </div>
                    <div className="p-[5px] bg-[#B3D7FF]">
                        <img src="./images/Asset/map/View1/Calender.svg" alt=""/>
                    </div>
                </div>



            </div>


        </div>
    );
};

export default BarChart;