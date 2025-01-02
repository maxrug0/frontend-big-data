import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { INITIAL_VIEW_STATE_DISTANCES, MAP_STYLE } from '../constants';
import { lightingEffect } from '../lighting';
import { createIconLayer, createConnectionLayer } from './distancesLayers';
import { generateMockData } from './mockData';

import styles from '../MapView.module.css';
import { useState } from 'react';

interface DistanceMapProps {
    isLoading: boolean;
  }

export function DistancesMapView({ isLoading }: DistanceMapProps) {
  const data = generateMockData();

  const [selectedClusters, setSelectedClusters] = useState<Set<number>>(new Set(data.map((_, index) => index)));

  const toggleCluster = (index: number) => {
    setSelectedClusters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const layers = (data.length >0 && selectedClusters.size > 0)
    ? [
        createIconLayer(),
        createConnectionLayer(data, selectedClusters) // Passa i cluster selezionati
      ]
    : [createIconLayer()];

  return (
    <div className={styles.container}>
      {isLoading && <div>Caricamento dati...</div>}
      <div className={styles.sidebar}>
        <h3>Filtra per Cluster</h3>
        {data.map((_, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selectedClusters.has(index)}
              onChange={() => toggleCluster(index)}
            />
            <label>Cluster {index}</label>
          </div>
        ))}
      </div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE_DISTANCES}
        controller={{
          dragRotate: false,
          doubleClickZoom: false,
        }}
        layers={layers}
        effects={[lightingEffect]}
        getTooltip={({ object }: { object: any | null | undefined }) => {
          if (!object) {
            return null;
          }
          if (object.type === 'connection') {
            return `Centroide ${object.label} - ${object.monumentName}\nDistanza: ${object.distance.toFixed(2)} km`;
          }
          if ('name' in object) {
            return `${object.name}`;
          }
          if ('latitude' in object && 'longitude' in object) {
            return `Lat: ${object.latitude.toFixed(6)}\nLng: ${object.longitude.toFixed(6)}`;
          }
          return null;
        }}
      >
        <Map reuseMaps mapStyle={MAP_STYLE} attributionControl={false} />
      </DeckGL>
    </div>
  );
}
