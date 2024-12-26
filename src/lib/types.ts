export interface Coordinate {
  position: [number, number];
  intensity: number;
}

export interface CoordinateData {
  latitude: number;
  longitude: number;
  intensity: number;
}

export type ClusterData = {
  latitude: number;
  longitude: number;
  radiusM: number;
  count: number;
};

export interface Photo {
  url: string;
  views: number;
  comments: number;
}

export interface Owner {
  rank: number;
  name: string;
  avatarUrl: string;
  totalPhotos: number;
  bestPhoto: Photo;
}
