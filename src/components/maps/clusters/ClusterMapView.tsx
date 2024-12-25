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

export function ClusterMapView() {
  const [clusterData, setClusterData] = useState<ClusterData[]>([]);

  useEffect(() => {
    // Simulazione di dati statici (può essere sostituita da un'API)
    const clusterData: [number, number, number, number][] = [
      [41.89375298280308, 12.488658329158346, 5, 250000],
      [41.90356198801827, 12.459961948517668, 3, 180000],
      [41.86275078302506, 12.580846400826982, 4, 120000],
    ];
    setClusterData(parseClusterData(clusterData));
  }, []);

  const layers = [createClusterLayer(clusterData)];

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
