import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { INITIAL_VIEW_STATE_CLUSTER, MAP_STYLE } from '../constants';
import { lightingEffect } from '../lighting';
import { createClusterLayer } from './layers';
import { formatNumber } from './utils';
import styles from '../MapView.module.css';
import type { ClusterData } from '@/lib/types';

interface ClusterMapProps {
  clusterData: ClusterData[];
  isLoading: boolean;
}

export function ClusterMapView({ clusterData, isLoading }: ClusterMapProps) {
  const layers = clusterData.length ? [createClusterLayer(clusterData)] : [];

  return (
    <div className={styles.container}>
      {isLoading && <div>Caricamento dati...</div>}
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
