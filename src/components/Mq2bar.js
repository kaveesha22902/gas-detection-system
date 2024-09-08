import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the components needed for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Mq2bar = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: ['MQ2'],
    datasets: [
      {
        label: 'MQ2 Sensor Value',
        data: [data], // Initial data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Update chart data when the `data` prop changes
    setChartData({
      labels: ['MQ2'],
      datasets: [
        {
          label: 'MQ2 Sensor Value',
          data: [data], // Update data
          backgroundColor: 'rgba(255, 12, 23, 0.6)', // Red background color
          borderColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white border color
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Live Bar Chart of MQ2 Sensor Value',
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              max: 50, // Set the maximum value for MQ2
            },
          },
        }}
      />
    </div>
  );
};

export default Mq2bar;
