import { MapView } from '@/components/maps/deckgl/MapView';
import styles from '../common.module.css';
import map_styles from './map.module.css';
import { useEffect, useState } from 'react';
import { Coordinate, CoordinateData } from '@/lib/types';
import { getCoordinates } from '@/components/api/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { RingProgress } from '@/components/charts/RingProgress';

export function Home() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchCoordinates = async () => {
      setIsLoading(true);
      try {
        const coordinatesData: CoordinateData[] = await getCoordinates();
        console.log('Dati originali:', coordinatesData);

        const mappedCoordinates: Coordinate[] = coordinatesData
          .filter(data => Array.isArray(data) && data.length >= 3) // Filtra dati non validi
          .map(data => ({
            position: [data[1], data[0]], // [longitude, latitude]
            intensity: data[2]           // intensity
          }));
        
        console.log('Dati mappati:', mappedCoordinates);
        
        setCoordinates(mappedCoordinates);
        
        console.log(coordinates.length);
      } catch (error) {
        console.error('Errore nel recupero dei dati annuali:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoordinates();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Homepage</h2>
        </div>
        <hr></hr>
        <div>
          <h2 className={styles.subtitle}>Informazioni sul dataset</h2>
          <p className={styles.text}>
          Il dataset contiene fotografie geolocalizzate di Roma raccolte tra il 2001 e il 2017. <br/>
            Le righe sono state filtrate e processate per garantire la qualità e la rilevanza 
            dei dati, mantenendo solo le foto più significative e rimuovendo contenuti duplicati 
            o non pertinenti.
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <RingProgress
                value={100}
                label="Dataset Originale"
                count={1_523_034}
                color="#66BB6A"
              />
            </div>
            <div className={styles.statCard}>
              <RingProgress
                value={80}
                label="Dataset Filtrato"
                count={1_081_259}
                color="#42A5F5"
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
        <h2 className={styles.subtitle}>Destribuzione geografica delle foto</h2>
          <p className={styles.text}>
            Esplora la distribuzione geografica dei post di Flickr con foto geotaggate.<br />
            Ogni esagono rappresenta un'area che aggrega le foto pubblicate, 
            permettendoti di scoprire i luoghi più documentati e popolari.
          </p>
        </div>
        <div className={map_styles.mapWrapper}>
          {isLoading ? (
              <LoadingSpinner />
            ) : (
            <MapView coordinates={coordinates}/>
            )
          }
        </div>
      </div>
    </div>
  );
}
