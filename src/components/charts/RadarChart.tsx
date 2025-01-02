import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';
  import type { CameraInfo } from '@/lib/types';
  import styles from '@/components/users-photos/top-owners/owner-card.module.css';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  
  interface CameraStatsProps {
    cameraStats: CameraInfo[];
  }
  
  export function CameraStats({ cameraStats }: CameraStatsProps) {
    const labels = cameraStats.map((camera) => `${camera.brand} ${camera.model}`);
    const usageData = cameraStats.map((camera) => camera.usage);

    const data = {
    labels,
      datasets: [{
        label: 'Camera Usage',
        data: usageData,
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(56, 189, 248, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(56, 189, 248, 1)'
      }]
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: 'white'
          },
          ticks: {
            color: '#a1a1aa',
            backdropColor: 'transparent'
          }
        }
      },
      plugins: {
        legend: {
          display: false,
          position: 'bottom' as const,
          labels: {
            color: 'white'
          }
        }
      }
    };
  
    return (
      <div className={styles.radarChart}>
        <Radar data={data} options={options} />
      </div>
    );
  }
