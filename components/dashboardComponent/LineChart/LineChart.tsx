// components/LineChart.tsx
'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import styles from './LineChart.module.scss'; // Import SCSS styles

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

interface LineChartProps {
  data: any;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow height to auto-adjust
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} Users`;
          },
        },
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false, // Auto-adjust based on minimum data value
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return <Line options={options} data={data} className={styles.chart} />;
};

export default LineChart;
