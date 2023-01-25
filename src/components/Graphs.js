import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'State On',
    },
  },
};

const labels2 = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

export default function Graphs({operatingLoad}) {
    const data = {
        labels:labels2,
        datasets: [
          {
            fill: true,
            label: operatingLoad[operatingLoad.length -1] < 20 ? "On Idle" : "On loaded",
            data: operatingLoad,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      
    
  return operatingLoad && <Line options={options} data={data} />;
}
