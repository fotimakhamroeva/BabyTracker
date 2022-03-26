import React from "react";
import { Line } from 'react-chartjs-2'
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
      text: 'Chart.js Line Chart',
    },
  },
};


export default function Graph(props) {

  const { logs, measurement } = props

  const getLabels = (logs) => {
    let labels = []
    for (let log in logs) {
      const label = new Date(logs[log].event_datetime * 1000).toString()
      labels.push(label.slice(0, 15))
    }
    return labels
  }

  const getAmounts = (logs) => {
    let amounts = []
    for (let log in logs) {
      amounts.push(logs[log].event_amount)
    }
    return amounts
  }

  let data = {}
  data.labels = getLabels(logs)
  data.datasets = []
  data.datasets.push({})
  data.datasets[0].label = measurement
  data.datasets[0].fill = false
  data.datasets[0].lineTension = 0.5
  data.datasets[0].backgroundColor = 'rgba(75,192,192,1)'
  data.datasets[0].borderColor = 'rgba(0,0,0,1)'
  data.datasets[0].borderWidth = 2
  data.datasets[0].data = getAmounts(logs)


  return(
    <div>
      <Line
        data={data}
        options={{
          title:{
            display:true,
            text:'Height change',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  )
}