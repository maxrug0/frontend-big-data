import { useState } from 'react';
import { ClusterControls } from '@/components/maps/clusters/ClusterControl';
import { ClusterMapView } from '@/components/maps/clusters/ClusterMapView';
import { KMeans } from '@/components/api/api';
import styles from '../common.module.css';
import map_styles from './map.module.css';
import type { Centroids, CentroidsData, Cluster, ClusterData, KMeansResponse } from '@/lib/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DistancesMapView } from '@/components/maps/clusters/DistancesMapView';

export function Clusters() {
  const [k, setK] = useState<number>(5);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [centroids, setCentroids] = useState<Centroids[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const MOCK_DATA: Cluster[] = [
    { latitude: 41.9028, longitude: 12.4964, label: 1 }, // Centro di Roma
    { latitude: 41.9097, longitude: 12.4823, label: 2 }, // Piazza di Spagna
    { latitude: 41.8902, longitude: 12.4922, label: 10 }, // Colosseo
    { latitude: 41.9029, longitude: 12.4534, label: 1 }, // Vaticano
    { latitude: 41.8760, longitude: 12.4808, label: 2 }, // Trastevere
    { latitude: 41.8986, longitude: 12.4768, label: 3 }, // Pantheon
    { latitude: 41.9115, longitude: 12.4546, label: 1 }, // Villa Borghese
    { latitude: 41.8892, longitude: 12.4722, label: 2 }, // Aventino
    { latitude: 41.9301, longitude: 12.4480, label: 3 }, // Monte Mario
    { latitude: 41.9025, longitude: 12.5144, label: 4 } // San Giovanni
  ];
  
  const MOCK_CENTROIDS: Centroids[] = [
    { latitude: 41.9028, longitude: 12.4964 }, // Centro di Roma
    { latitude: 41.8902, longitude: 12.4922 }, // Colosseo
    { latitude: 41.9115, longitude: 12.4546 }, // Villa Borghese
    { latitude: 41.9301, longitude: 12.4480 }, // Monte Mario
  ];
  

  const fetchClusterData = async (clusters: number) => {
    setIsLoading(true);
    try {
      const kMeansResponse: KMeansResponse = await KMeans(clusters);
      const clusterData: ClusterData[] = kMeansResponse.labels;
      const mappedCluster: Cluster[] = clusterData
        .filter(data => Array.isArray(data) && data.length >= 3) // Filtra dati non validi
        .map(data => ({
          latitude: data[0],
          longitude: data[1],
          label: data[2]           
        }));
      const centroidsData: CentroidsData[] = kMeansResponse.centroids;
      const mappedCentroids: Centroids[] = centroidsData
      .filter(data => Array.isArray(data) && data.length >= 2) // Filtra dati non validi
      .map(data => ({
        latitude: data[0],
        longitude: data[1],    
      }));

      setClusters(mappedCluster);
      setCentroids(mappedCentroids);
      //setClusters(MOCK_DATA);
      //setCentroids(MOCK_CENTROIDS)
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
        <h2 className={styles.title}>Mappa dei Cluster: analisi geografica</h2>
      </div>
      <hr />
      <div>
        <p className={styles.text}>
        Ogni punto sulla mappa rappresenta una posizione geografica e i punti con lo stesso colore appartengono allo stesso cluster. <br/>
        I cluster sono determinati utilizzando l'algoritmo k-means, che identifica i centroidi e assegna ogni punto al cluster più vicino in base alle coordinate geografiche.
        </p>
      </div>
      <div>
        <ClusterControls k={k} onVisualizza={handleVisualizza} />
      </div>
      <div className={map_styles.mapWrapper}>
      {isLoading ? (
            <LoadingSpinner />
          ) : (
          <ClusterMapView clusters={clusters} centroids={centroids} isLoading={isLoading} />
        )
      }
      </div>
      <div className={map_styles.mapWrapper}>
        <DistancesMapView isLoading={false}/>
      </div>
    </div>
  );
}
