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
  Legend,
  TooltipItem,
} from 'chart.js';
import styles from './LineChart.module.scss'; // Import SCSS styles

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      pointBackgroundColor?: string;
      pointRadius?: number;
      fill?: boolean;
      borderWidth?: number;
      tension?: number;
    }>;
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow height to auto-adjust
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            return `${tooltipItem.dataset.label || ''}: ${tooltipItem.raw} Users`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ffffffff',
        borderWidth: 1,
      },
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#ffffffff',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: false, // Auto-adjust based on minimum data value
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 50,
          color: '#6B7280',
          font: {
            size: 11,
          },
          callback: function(value: number | string) {
            return typeof value === 'number' ? value.toLocaleString() : value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  // Validate data before rendering
  if (!data || !data.labels || !data.datasets || data.labels.length === 0) {
    return (
      <div className={styles.chartError}>
        <p>No chart data available</p>
      </div>
    );
  }

  return (
    <div className={styles.chartWrapper}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
