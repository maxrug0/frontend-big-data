import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Coordinate } from '@/lib/types';

export function createHexagonLayer(data: Coordinate[], elevationScale: number) {
  return new HexagonLayer({
    id: 'hexagon',
    data,
    getPosition: (d: Coordinate) => d.position,
    getElevationWeight: (d: Coordinate) => d.intensity,
    extruded: true,
    radius: 80,
    coverage: 0.7,
    upperPercentile: 100,
    elevationRange: [0, 3000],
    elevationScale, // Valore dinamico
    colorRange: [
      [0, 128, 255],
      [0, 176, 255],
      [0, 221, 255],
      [255, 196, 0],
      [255, 128, 0],
      [255, 0, 0],
    ],
    pickable: true,
    material: {
      ambient: 0.64,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [51, 51, 51],
    },
  });
}
