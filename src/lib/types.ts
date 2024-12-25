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
  radiusKm: number;
  count: number;
};
