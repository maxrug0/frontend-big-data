import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Visits',
        color: 'white'
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  interface LineChartProps {
    lineColor?: string; 
  }
  
  export function LineChartComponent({lineColor='rgb(75, 192, 192)'}: LineChartProps) {
    const data = {
      labels,
      datasets: [
        {
          label: 'Visits 2024',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: lineColor,
          backgroundColor: lineColor.replace('rgb', 'rgba').replace(')', ', 0.5)'),
        }
      ],
    };

    return <Line options={options} data={data} />;
  }
