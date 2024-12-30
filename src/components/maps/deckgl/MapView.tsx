import { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { INITIAL_VIEW_STATE, MAP_STYLE } from '../constants';
import { createHexagonLayer } from './layers';
import { lightingEffect } from '../lighting';
import { getTooltip } from './tooltip';
import { loadCoordinates } from '@/lib/coordinates';
import type { Coordinate } from '@/lib/types';
import styles from '../MapView.module.css';

export function MapView() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [elevationScale, setElevationScale] = useState(0); // Elevation iniziale
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCoordinates().then(setCoordinates);
    

    // Dopo un breve ritardo, cambia `elevationScale` a 1
    const interval = setInterval(() => {
      setElevationScale(prev => {
        if (prev < 1) {
          return prev + 0.05; // Incremento graduale
        } else {
          clearInterval(interval); // Ferma l'intervallo quando arriva a 1
          return 1;
        }
      });
    }, 60); // Incrementa ogni 50ms
  
    // Pulizia dell'intervallo
    return () => clearInterval(interval);
  }, []);

  const layers = [createHexagonLayer(coordinates, elevationScale)];

  return (
    <div className={styles.container}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
      >
        <Map
          reuseMaps
          mapStyle={MAP_STYLE}
          attributionControl={false}
        />
      </DeckGL>
    </div>
  );
}
