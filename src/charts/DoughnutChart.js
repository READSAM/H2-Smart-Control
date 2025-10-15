import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, options }) => {
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right', // Positioning the legend to the right
                labels: {
                    color: '#e0e0e0', // Light text for legend
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw;
                        return `${label}: ${value}%`;
                    }
                }
            }
        },
        ...options, // Merge with custom options
    };

    return <Doughnut data={data} options={defaultOptions} />;
};

export default DoughnutChart;