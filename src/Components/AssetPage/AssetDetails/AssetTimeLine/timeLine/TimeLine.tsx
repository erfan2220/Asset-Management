//@ts-nocheck
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const TimeLine = () => {
    const [series, setSeries] = useState([
        {
            name: 'Bob',
            data: [
                {
                    x: 'PM',
                    y: [
                        new Date('2019-03-05').getTime(),
                        new Date('2019-03-08').getTime(),
                    ],
                },

                {
                    x: 'WO',
                    y: [
                        new Date('2019-03-11').getTime(),
                        new Date('2019-03-16').getTime(),
                    ],
                },

            ],
        },
        {
            name: 'Joe',
            data: [

                {
                    x: 'Failures',
                    y: [
                        new Date('2019-03-08').getTime(),
                        new Date('2019-03-11').getTime(),
                    ],
                },

                {
                    x: 'Inspections',
                    y: [
                        new Date('2019-03-11').getTime(),
                        new Date('2019-03-16').getTime(),
                    ],
                },
            ],
        },
    ]);

    const [options, setOptions] = useState({
        chart: {
            width: '100%',
            height: 350,
            type: 'rangeBar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                const startDate = new Date(val[0]);
                const endDate = new Date(val[1]);
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays + (diffDays > 1 ? ' days' : ' day');
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100],
            },
        },
        xaxis: {
            type: 'datetime',
        },
        legend: {
            position: 'top',
        },
    });

    return (
        <div className="w-full">
            <div id="chart" className="w-full">
                <ReactApexChart options={options} series={series} type="rangeBar" height={350} />
            </div>

        </div>
    );
};

export default TimeLine;
