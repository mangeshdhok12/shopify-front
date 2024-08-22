import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RepeatCustomersChart = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [interval, setInterval] = useState('daily'); // Default to daily

    useEffect(() => {
        axios.get(`https://shopify-backend-fw6d.onrender.com/getRepeatCustomers?interval=${interval}`)
            .then(response => {
                const repeatData = response.data;
                const labels = repeatData.map(item => {
                    if (interval === 'daily') return `${item._id.day}/${item._id.month}/${item._id.year}`;
                    if (interval === 'monthly') return `${item._id.month}/${item._id.year}`;
                    if (interval === 'quarterly') return `Q${item._id.quarter}/${item._id.year}`;
                    if (interval === 'yearly') return `${item._id.year}`;
                    return ''; // This line ensures every branch returns something
                });
                const data = repeatData.map(item => item.repeatCustomers);

                setLabels(labels);
                setData(data);
            })
            .catch(error => {
                console.error("There was an error fetching the repeat customers data!", error);
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
                label: `Repeat Customers (${interval})`,
                data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h2>4. Repeat Customers Over Time</h2>
            <label htmlFor="intervalSelect">Select Interval: </label>
            <select id="intervalSelect" value={interval} onChange={handleIntervalChange}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
            <Line data={chartData} />
        </div>
    );
};

export default RepeatCustomersChart;


