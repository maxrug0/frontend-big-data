import { LineChartComponent } from '../components/charts/LineChart';
import { PieChartComponent } from '../components/charts/PieChart';
import styles from './common.module.css';
import analytics_styles from './analytics.module.css';

export function PhotoTrends() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
      </div>
      <div className={styles.content}>
        <div className={analytics_styles.chartsGrid}>
          <div className={analytics_styles.chartContainer}>
            <LineChartComponent lineColor='rgb(75, 192, 192)' />
          </div>
          <div className={analytics_styles.chartContainer}>
            <LineChartComponent lineColor='rgb(180, 120, 80)'/>
          </div>
        </div>
        <div className={styles.content}>
            
        </div>
      </div>
    </div>
  );
}
