import React, { useEffect, useState } from 'react';
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
import faker from 'faker';
import {getMinMaxDayValue, getOperatingLoad} from '../utils/process'

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

console.log(labels2.map(() => faker.datatype.number({ min: 0, max: 100 })))
export default function Graphs() {
    const [labels, setLabels] = useState();
    const [operatingLoad, setOperatingLoad]= useState([]);
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
      console.log(operatingLoad)
    useEffect(() => {
        const fetchMaxAndMin = async () => {
            const operatingLoad = await getOperatingLoad();
            console.log(operatingLoad)
            setOperatingLoad(operatingLoad)
            const minMax =  await getMinMaxDayValue();
            setLabels(minMax)
        }
        fetchMaxAndMin()
    }, [])
  return operatingLoad && <Line options={options} data={data} />;
}
