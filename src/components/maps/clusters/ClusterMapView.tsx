import { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { INITIAL_VIEW_STATE_CLUSTER, MAP_STYLE } from '../constants';
import { lightingEffect } from '../lighting';
import { createClusterLayer } from './layers';
import { parseClusterData, formatNumber } from './utils';
import styles from '../MapView.module.css';
import type { ClusterData } from '@/lib/types';
import { getCentroidsKMeans  } from '@/components/api';

export function ClusterMapView() {
  const [clusterData, setClusterData] = useState<ClusterData[]>([]);
  const [k, setValueK] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [layers, setLayers] = useState<any[]>([])


  useEffect(() => {
    const fetchClusterData = async () => {
      try {
          const clusterDataRaw = await getCentroidsKMeans(k);
          console.log("Dati ricevuti dall'API:", clusterDataRaw); // <-- Logga i dati
          const parsedData = parseClusterData(clusterDataRaw);
          setClusterData(parsedData);
          setLayers([createClusterLayer(parsedData)]);
      } catch (error) {
          console.error('Errore nel recupero dei dati annuali:', error);
      } finally {
          setIsLoading(false);
      }
  };
  
    fetchClusterData();
  }, []);

  return (
    <div className={styles.container}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE_CLUSTER}
        controller={{
          dragRotate: false, // Disabilita lo spostamento verticale
          doubleClickZoom: false, // Disabilita lo zoom con doppio clic
        }}
        layers={layers}
        effects={[lightingEffect]}
        getTooltip={({ object } : { object: ClusterData | null | undefined }) =>
          object
            ? `Lat: ${object.latitude.toFixed(6)}\nLng: ${object.longitude.toFixed(6)}\nCount: ${formatNumber(
                object.count
              )}`
            : null
        }
      >
        <Map reuseMaps mapStyle={MAP_STYLE} attributionControl={false} />
      </DeckGL>
    </div>
  );
}
