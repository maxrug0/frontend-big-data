import { LineChartComponent } from '../components/charts/LineChart';
import { PieChartComponent } from '../components/charts/PieChart';
import styles from './common.module.css';

export function Analytics() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.chartsGrid}>
          <div className={styles.chartContainer}>
            <LineChartComponent />
          </div>
          <div className={styles.chartContainer}>
            <PieChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
