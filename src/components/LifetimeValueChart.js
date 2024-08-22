
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement, 
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement,  LineElement, 
PointElement, Title, Tooltip, Legend);

const LifetimeValueChart = () => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [customerCounts, setCustomerCounts] = useState([]);

    useEffect(() => {
        axios.get('https://shopify-back.vercel.app/getCustomerLifetimeValueByCohort')
            .then(response => {
                const lifetimeData = response.data;
                const labels = lifetimeData.map(item => `${item._id.cohort}/${item._id.year}`);
                const data = lifetimeData.map(item => item.lifetimeValue);
                const customerCounts = lifetimeData.map(item => item.customerCount);

                setLabels(labels);
                setData(data);
                setCustomerCounts(customerCounts);
            })
            .catch(error => {
                console.error("There was an error fetching the customer lifetime value data!", error);
            });
    }, []);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Customer Lifetime Value (CLV)',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Number of Customers',
                data: customerCounts,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                type: 'line' 
            }
        ]
    };

    return (
        <div>
            <h2>6. Customer Lifetime Value by Cohorts</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default LifetimeValueChart;
