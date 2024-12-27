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
  count: number;
};

export interface Photo {
  url: string;
  views: number;
}

export interface Owner {
  rank: number;
  name: string;
  avatarUrl: string;
  totalPhotos: number;
  bestPhoto: Photo;

}

export interface AssociationRule {
  antecedent: string[];
  consequent: string[];
  confidence: number;
  lift: number;
  support: number;
}

export interface RuleMetrics {
  confidence: number;
  lift: number;
  support: number;
}
