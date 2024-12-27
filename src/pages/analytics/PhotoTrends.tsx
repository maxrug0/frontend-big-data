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
  const [isMonthlyDataLoading, setIsMonthlyDataLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchYearData = async () => {
      setIsMonthlyDataLoading(true);
      try {
        const data = await getPhotoCountByYear(); // Commento la chiamata API
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
        const data = await getPhotoCountByMonth(); // Commento la chiamata API
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
          const difference = index > 0 ? item.count - previousCount : 0;
          return {
            month: item.month,
            count: item.count,
            trend: {
              value: Math.abs(difference),
              direction: difference >= 0 ? 'up' : 'down',
            },
          };
        }) as { month: string; count: number; trend: { value: number; direction: 'up' | 'down' } }[];
        setMonthlyData(processedData);
      } catch (error) {
        console.error('Errore nel recupero dei dati mensili per anno:', error);
      } finally {
        setIsMonthlyDataLoading(false); // Fine caricamento
      }
    };
    fetchMonthlyData();
  }, [selectedYear]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analisi delle foto pubblicate nel tempo</h1>
      </div>
      <div className={styles.content}>
        <div className={analytics_styles.chartsGrid}>
          <div className={analytics_styles.chartContainer}>
            {isYearLoading ? (
              <div className={styles.loader}>Caricamento dati annuali...</div>
            ) : (
              <LineChartComponent
                lineColor='rgb(0, 128, 191)'
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
                lineColor='rgb(255, 87, 34)'
                labels={monthLabels}
                data={monthData}
                title="Foto postate mensilmente"
              />
            )}
          </div>
        </div>
        <hr></hr>
        <div className={analytics_styles.selectContainer}>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            className={analytics_styles.select}
            required
          >
            <option value="" disabled>
              Seleziona un anno
            </option>
            {yearLabels.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className={analytics_styles.monthsGrid}>
          {isMonthlyDataLoading ? (
            <div className={styles.loader}>Caricamento dati...</div> // Mostra la rotella di caricamento
          ) : (
            monthlyData.map((item) => (
              <div key={item.month} className={analytics_styles.monthCard}>
                <h3>{item.month}</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{item.count}</p>
                <p style={{ color: item.trend.direction === 'up' ? 'green' : 'red' }}>
                  {item.trend.value} {item.trend.direction === 'up' ? '↑' : '↓'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
