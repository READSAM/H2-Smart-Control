import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, options }) => {
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e0e0e0', // Light text for legend
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#444' // Darker grid lines
                },
                ticks: {
                    color: '#e0e0e0' // Light text for x-axis labels
                }
            },
            y: {
                grid: {
                    color: '#444'
                },
                ticks: {
                    color: '#e0e0e0' // Light text for y-axis labels
                }
            }
        },
        ...options, // Merge with custom options
    };

    return <Line data={data} options={defaultOptions} />;
};

export default LineChart;