import { useState } from 'react';
import { ClusterControls } from '@/components/maps/clusters/ClusterControl';
import { ClusterMapView } from '@/components/maps/clusters/ClusterMapView';
import { getCentroidsKMeans } from '@/components/api/api';
import styles from '../common.module.css';
import map_styles from './map.module.css';
import type { ClusterData } from '@/lib/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function Clusters() {
  const [k, setK] = useState<number>(5);
  const [clusterData, setClusterData] = useState<ClusterData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchClusterData = async (clusters: number) => {
    setIsLoading(true);
    try {
      const clusterDataRaw = await getCentroidsKMeans(clusters);
      setClusterData(clusterDataRaw);
    } catch (error) {
      console.error('Errore nel recupero dei dati dei cluster:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisualizza = (clusters: number) => {
    setK(clusters); // Aggiorna lo stato di k
    fetchClusterData(clusters); // Recupera i dati
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mappa dei Cluster: Analisi Geografica</h2>
      </div>
      <hr />
      <div>
        <p className={styles.text}>
          Esplora la distribuzione geografica dei dati attraverso i cluster.<br />
          Ogni cerchio rappresenta un cluster che aggrega informazioni basate sulla posizione geografica, 
          fornendo una visione chiara delle aree con maggiore concentrazione di dati.
        </p>
      </div>
      <div>
        <ClusterControls k={k} onVisualizza={handleVisualizza} />
      </div>
      <div className={map_styles.mapWrapper}>
      {isLoading ? (
            <LoadingSpinner />
          ) : (
          <ClusterMapView clusterData={clusterData} isLoading={isLoading} />
        )
      }
      </div>
    </div>
  );
}
