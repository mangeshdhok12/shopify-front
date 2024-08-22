

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function SalesGrowthChart() {
    const [salesGrowthData, setSalesGrowthData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sales Growth Rate (%)',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    });

    useEffect(() => {
        axios.get('http://localhost:5000/getOverallSalesGrowthRate')
            .then(res => {
              
                if (res.data && Array.isArray(res.data)) {
                    const chartData = {
                        labels: res.data.map(item => item._id ? `${item._id.month}/${item._id.year}` : '2022'),
                        datasets: [{
                            label: 'Sales Growth Rate (%)',
                            data: res.data.map(item => item.growthRate || 0),
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                        }]
                    };
                    setSalesGrowthData(chartData);
                } else {
                    console.error('Unexpected data format:', res.data);
                }
            })
            .catch(err => {
                console.error("Error fetching sales growth data:", err.response || err.message || err);
            });
    }, []);

    return (
        <div>
            <h2>2. Sales Growth Rate Over Time</h2>
            <Line data={salesGrowthData} />
        </div>
    );
}

export default SalesGrowthChart;

