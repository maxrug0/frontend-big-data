import { MapView } from '@/components/maps/deckgl/MapView';
import styles from '../common.module.css';
import map_styles from './map.module.css';
import { useEffect, useState } from 'react';
import { Coordinate, CoordinateData } from '@/lib/types';
import { getCoordinates } from '@/components/api/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function SpatialPosts() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchCoordinates = async () => {
      setIsLoading(true);
      try {
        const coordinatesData: CoordinateData[] = await getCoordinates();
        console.log(coordinatesData);
        const mappedCoordinates: Coordinate[] = coordinatesData.map(data => ({
          position: [data.longitude, data.latitude],
          intensity: data.intensity 
        }));
        setCoordinates(mappedCoordinates)
      } catch (error) {
        console.error('Errore nel recupero dei dati annuali:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoordinates();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mappa delle Foto Geotaggate: Analisi Visiva</h2>
      </div>
      <hr></hr>
      <div>
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
  );
}
