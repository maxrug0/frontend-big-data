import type { ClusterData, Owner } from '@/lib/types';

  export function parseClusterData(data: Array<{
    centroidX: number;
    centroidY: number;
    count: number;
  }>):ClusterData[] {
    return data.map(({ 
      centroidX, 
      centroidY, 
      count }) => ({
        latitude: centroidX,
        longitude: centroidY,
        count,
    }));
}

export function parseOwnersData(data: Array<{ 
  rank: number; 
  user_id: string; 
  username: string; 
  avatar_url: string; 
  total_photos: number; 
  best_photo_url: string; 
  total_views: number;
}>): Owner[] {
  return data.map(({ 
    rank, 
    username, 
    avatar_url, 
    total_photos, 
    best_photo_url, 
    total_views 
  }) => ({
    rank,
    name: username,
    avatarUrl: avatar_url,
    totalPhotos: total_photos,
    bestPhoto: {
      url: best_photo_url,
      views: total_views,
    }
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
