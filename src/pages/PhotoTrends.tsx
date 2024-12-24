import { LineChartComponent } from '../components/charts/LineChart';
import styles from './common.module.css';
import analytics_styles from './analytics.module.css';
import { useEffect, useState } from 'react';
import { getPhotoCountByMonth, getPhotoCountByYear } from '@/components/api';

export function PhotoTrends() {
  const [yearLabels, setYearLabels] = useState<string[]>([]);
  const [yearData, setYearData] = useState<number[]>([]);
  const [monthLabels, setMonthLabels] = useState<string[]>([]);
  const [monthData, setMonthData] = useState<number[]>([]);
  const [isYearLoading, setIsYearLoading] = useState<boolean>(true);
  const [isMonthLoading, setIsMonthLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const data = await getPhotoCountByYear();
        setYearLabels(data.map((item: any) => item.year));
        setYearData(data.map((item: any) => item.count));
      } catch (error) {
        console.error('Errore nel recupero dei dati annuali:', error);
      } finally {
        setIsYearLoading(false);
      }
    };
    fetchYearData();
  }, []);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const data = await getPhotoCountByMonth();
        setMonthLabels(data.map((item: any) => item.month));
        setMonthData(data.map((item: any) => item.count));
      } catch (error) {
        console.error('Errore nel recupero dei dati mensili:', error);
      } finally {
        setIsMonthLoading(false);
      }
    };
    fetchMonthData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
      </div>
      <div className={styles.content}>
        <div className={analytics_styles.chartsGrid}>
          <div className={analytics_styles.chartContainer}>
            {isYearLoading ? (
              <div className={styles.loader}>Caricamento dati annuali...</div>
            ) : (
              <LineChartComponent
                lineColor='rgb(75, 192, 192)'
                labels={yearLabels}
                data={yearData}
                title="Foto postate annualmente"
              />
            )}
          </div>
          <div className={analytics_styles.chartContainer}>
            {isMonthLoading ? (
              <div className={styles.loader}>Caricamento dati mensili...</div>
            ) : (
              <LineChartComponent
                lineColor='rgb(180, 120, 80)'
                labels={monthLabels}
                data={monthData}
                title="Foto postate mensilmente"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
