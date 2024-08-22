import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NewCustomersChart = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getNewCustomers')
            .then(response => {
                const customerData = response.data;
                const labels = customerData.map(item => {
                    return `${item._id.day}/${item._id.month}/${item._id.year}`;
                });
                const data = customerData.map(item => item.count);

                setLabels(labels);
                setData(data);
            })
            .catch(error => {
                console.error("There was an error fetching the new customers data!", error);
            });
    }, []);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'New Customers',
                data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h2>3. New Customers Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default NewCustomersChart;
