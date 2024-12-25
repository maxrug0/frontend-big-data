import { LineChartComponent } from '../../components/charts/LineChart';
import styles from '../common.module.css';
import analytics_styles from './analytics.module.css';
import { useEffect, useState } from 'react';
import { getPhotoCountByMonth, getPhotoCountByYear, getPhotoPerMonthByYear } from '@/components/api';

export function PhotoTrends() {
  const [yearLabels, setYearLabels] = useState<number[]>([]);
  const [yearData, setYearData] = useState<number[]>([]);
  const [monthLabels, setMonthLabels] = useState<string[]>([]);
  const [monthData, setMonthData] = useState<number[]>([]);
  const [isYearLoading, setIsYearLoading] = useState<boolean>(true);
  const [isMonthLoading, setIsMonthLoading] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<number>(2004);
  const [monthlyData, setMonthlyData] = useState<{ 
    month: string; 
    count: number; 
    trend: { 
      value: number; 
      direction: 'up' | 'down' 
    } 
  }[]>([]);

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

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const data = await getPhotoPerMonthByYear(selectedYear);
        const processedData = data.map((item: any, index: number, arr: any[]) => {
          const previousCount = index > 0 ? arr[index - 1].count : 0;
          const difference = item.count - previousCount;
          return {
            month: item.month,
            count: item.count,
            trend: {
              value: Math.abs(difference),
              direction: difference > 0 ? 'up' : 'down',
            },
          };
        }) as { month: string; count: number; trend: { value: number; direction: 'up' | 'down' } }[];
        setMonthlyData(processedData);
      } catch (error) {
        console.error('Errore nel recupero dei dati mensili per anno:', error);
      }
    };
    fetchMonthlyData();
  }, [selectedYear]);

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
                labels={yearLabels.map(String)}
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
        <div className={analytics_styles.monthsGrid}>
          <div>
          <label htmlFor="year-select" className={analytics_styles.selectLabel}>Seleziona anno: </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            >
              {yearLabels.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {monthlyData.map((item) => (
            <div key={item.month} className={analytics_styles.monthCard}>
              <h3>{item.month}</h3>
              <p>Foto: {item.count}</p>
              <p style={{ color: item.trend.direction === 'up' ? 'green' : 'red' }}>
                Trend: {item.trend.value} {item.trend.direction === 'up' ? '↑' : '↓'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
