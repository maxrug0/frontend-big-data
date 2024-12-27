import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { ClusterData } from '@/lib/types';
import { getColorForCount, formatNumber } from './utils';

export function createClusterLayer(clusterData: ClusterData[]) {
  const maxCount = Math.max(...clusterData.map((item) => item.count), 1); // Massimo count nei dati

  const layers = [
    new ScatterplotLayer({
      id: 'cluster-layer',
      data: clusterData,
      pickable: true,
      getPosition: (d: ClusterData) => [d.longitude, d.latitude],
      getRadius: (d: ClusterData) => {
        // Normalizza il count in base al massimo e scala il raggio
        const normalizedCount = d.count / maxCount; 
        const baseRadius = 100; // Raggio minimo in metri
        const maxRadius = 1_000; // Raggio massimo in metri
        return baseRadius + normalizedCount * (maxRadius - baseRadius);
      },
      radiusUnits: 'meters',
      getFillColor: (d: ClusterData) => {
        const color = getColorForCount(d.count, maxCount);
        const [r, g, b] = color.match(/\d+/g)!.map(Number);
        return [r, g, b, 200]; // Aggiunta dell'alpha
      },
      radiusMinPixels: 0,
      radiusMaxPixels: Number.MAX_VALUE,
      getLineColor: [255, 255, 255],
      lineWidthMinPixels: 1,
    }),
    new TextLayer({
      id: 'cluster-text-layer',
      data: clusterData,
      pickable: false,
      getPosition: (d: ClusterData) => [d.longitude, d.latitude],
      getText: (d: ClusterData) => formatNumber(d.count),
      getSize: 16,
      getColor: [255, 255, 255],
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
    }),
  ];

  return layers;
}
