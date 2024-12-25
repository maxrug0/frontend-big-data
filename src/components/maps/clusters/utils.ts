import type { ClusterData } from '@/lib/types';

export function parseClusterData(data: [number, number, number, number][]): ClusterData[] {
    return data.map(([lat, lon, radiusKm, count]) => ({
      latitude: lat,
      longitude: lon,
      radiusKm,
      count,
    }));
  }
  
export function formatNumber(num: number): string {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  }
  
export function kmToPixels(km: number, latitude: number, zoom: number): number {
    const earthRadius = 6371;
    const groundResolution =
      (Math.cos(latitude * Math.PI / 180) * 2 * Math.PI * earthRadius) /
      (256 * Math.pow(2, zoom));
    return km / groundResolution;
    }
  
export function getColorForCount(count: number, maxCount: number): string {
    const COLOR_RANGE = [
        [0, 128, 255], // Light blue
        [0, 176, 255], // Medium blue
        [0, 221, 255], // Cyan blue
        [255, 196, 0], // Yellow
        [255, 128, 0], // Orange
        [255, 0, 0], // Red
    ] as const;

    const index = Math.floor((count / maxCount) * (COLOR_RANGE.length - 1));
    const color = COLOR_RANGE[Math.min(index, COLOR_RANGE.length - 1)];
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.85)`;
    }
