// components/BubbleChart.js
import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale
);

const BubbleChart = () => {
  const data = {
    datasets: [
      {
        label: 'Bubble Dataset 1',
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 15, y: 10, r: 10 },
          { x: 25, y: 15, r: 20 },
          { x: 35, y: 25, r: 25 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    //   {
    //     label: 'Bubble Dataset 2',
    //     data: [
    //       { x: 20, y: 30, r: 10 },
    //       { x: 25, y: 20, r: 15 },
    //       { x: 30, y: 25, r: 20 },
    //       { x: 40, y: 35, r: 25 },
    //     ],
    //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //     borderColor: 'rgba(54, 162, 235, 1)',
    //   },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Meeting summary',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Axis',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Axis',
        },
      },
    },
  };

  return <Bubble data={data} options={options} />;
};

export default BubbleChart;
