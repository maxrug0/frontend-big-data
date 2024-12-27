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

interface ClusterMapProps {
  k: number;
}

export function ClusterMapView({ k }: ClusterMapProps) {
  const [clusterData, setClusterData] = useState<ClusterData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [layers, setLayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchClusterData = async () => {
      setIsLoading(true); // Mostra caricamento
      try {
        const clusterDataRaw = await getCentroidsKMeans(k); // Richiama l'API con il nuovo valore di k
        console.log("Dati ricevuti dall'API:", clusterDataRaw);
        const parsedData = parseClusterData(clusterDataRaw);
        setClusterData(parsedData);
        setLayers([createClusterLayer(clusterData)]);
      } catch (error) {
        console.error('Errore nel recupero dei dati dei cluster:', error);
      } finally {
        setIsLoading(false); // Nascondi caricamento
      }
    };

    fetchClusterData();
  }, [k]); // Effettua la chiamata ogni volta che k cambia

  return (
    <div className={styles.container}>
      {isLoading && <div>Caricamento dati...</div>} {/* Mostra messaggio di caricamento */}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE_CLUSTER}
        controller={{
          dragRotate: false,
          doubleClickZoom: false,
        }}
        layers={layers}
        effects={[lightingEffect]}
        getTooltip={({ object }: { object: ClusterData | null | undefined }) =>
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
