import { LineLayer, IconLayer } from '@deck.gl/layers';
import monument from '@/components/assets/monument.png';
import { MockData, Distanza } from './mockData';
import { ArcLayer } from 'deck.gl';

const COLORS = [
  [255, 0, 0, 200],
  [0, 255, 0, 200],
  [0, 0, 255, 200],
  [255, 255, 0, 200],
  [255, 0, 255, 200],
  [0, 255, 255, 200],
  [128, 0, 128, 200],
  [255, 165, 0, 200],
  [128, 128, 128, 200],
  [0, 128, 128, 200],
];

export function createConnectionLayer(data: MockData[], selectedClusters: Set<number>){
    const connections = data.flatMap((entry, index) => {
      if (selectedClusters.size > 0 && !selectedClusters.has(index)) {
        return []; // Ignora i cluster non selezionati
      }
  
      const { centroide, distanze } = entry;
  
      return distanze.map((distanza) => ({
        sourcePosition: [centroide.longitudine, centroide.latitudine],
        targetPosition: [distanza.longitudine, distanza.latitudine],
        label: centroide.label,
        monumentName: distanza.monumento,
        distance: distanza.distanza,
        color: COLORS[centroide.label % COLORS.length],
      }));
    });
  
    return new ArcLayer({
      id: 'connection-layer',
      data: connections,
      getSourcePosition: (d: { sourcePosition: [number, number] }) => d.sourcePosition,
      getTargetPosition: (d: { targetPosition: [number, number] }) => d.targetPosition,
      getSourceColor: (d: { color: [number, number, number, number] }) => d.color,
      getTargetColor: (d: { color: [number, number, number, number] }) => d.color,
      getWidth: 2,
      pickable: true,
    });
  }
  
  export function createIconLayer(){
    const monumentsInRome = [
      { name: "Colosseo", latitude: 41.8902, longitude: 12.4922 },
      // Add more monuments as needed
    ];
  
    return new IconLayer({
      id: 'icon-layer',
      data: monumentsInRome,
      pickable: true,
      getPosition: (d: { latitude: number; longitude: number }) => [d.longitude, d.latitude],
      getSize: 40,
      sizeUnits: 'pixels',
      iconAtlas: monument,
      iconMapping: {
        marker: { x: 0, y: 0, width: 128, height: 128, anchorY: 128 },
      },
      getIcon: () => 'marker',
    });
  }
