
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TotalSalesChart = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [interval, setInterval] = useState('daily'); // Default interval

    useEffect(() => {
        axios.get(`http://localhost:5000/getTotalSales?interval=${interval}`)
            .then(response => {
                const salesData = response.data;
                // Extract labels and data based on the selected interval
                const labels = salesData.map(item => {
                    if (interval === 'daily') return `${item._id.day}/${item._id.month}/${item._id.year}`;
                    if (interval === 'monthly') return `${item._id.month}/${item._id.year}`;
                    if (interval === 'quarterly') return `Q${Math.ceil(item._id.month / 3)}/${item._id.year}`;
                    if (interval === 'yearly') return `${item._id.year}`;
                    // Return a placeholder or default value if none of the conditions are met
                    return '';
                });
                const data = salesData.map(item => item.totalSales);

                setLabels(labels);
                setData(data);
            })
            .catch(error => {
                console.error("There was an error fetching the sales data!", error);
                console.error("Error details:", error.response || error.message || error);
            });
    }, [interval]);

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: `Total Sales (${interval})`,
                data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h2>1. Total Sales Over Time</h2>
            <select value={interval} onChange={handleIntervalChange}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
            <Line data={chartData} />
        </div>
    );
};

export default TotalSalesChart;

