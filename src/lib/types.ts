// Home
export type CoordinateData = [number, number, number]; // [latitude, longitude, intensity]
export interface Coordinate {
  position: [number, number];
  intensity: number;
}

//######################################

// Cluster
export type ClusterData = [number, number, number]; // [latitude, longitude, intensity]
export type Cluster = {
  latitude: number;
  longitude: number;
  label: number;
};

export type CentroidsData = [number, number];
export type Centroids = {
  latitude: number;
  longitude: number;
};

export interface KMeansResponse {
  labels: ClusterData[]; 
  centroids: CentroidsData[]; 
}

//######################################

// Trend fotografici

export type MonthData = [string, number];
export type YearData = [number, number];
export interface PhotoCount {
  month_data: MonthData[];
  year_data: YearData[];
}

export type HourCountData = [number, number];
export interface HourData {
  posted: HourCountData[];
  taken: HourCountData[];
}

//######################################

// Analisi dei tag

export interface TagsResponse {
  count: number;
  tagValue: string;
}

export interface AssociationRule {
  antecedent: string[];
  confidence: number;
  consequent: string[];
  lift: number;
  support: number;
}

export interface RuleMetrics {
  confidence: number;
  lift: number;
  support: number;
}

export interface RuleSearchFilters {
  minSupport: number;
  minConfidence: number;
  tags: string[];
}

//######################################

// Analisi degli utenti

export interface Photo {
  title: string;
  url: string;
  views: number;
  comments: number;
}

export interface CameraInfo {
  brand: string;
  model: string;
  usage: number;
}

export interface OwnerSearched {
  rank: number;
  name: string;
  avatarUrl: string;
  totalPhotos: number;
  totalViews: number;
  totalComments: number;
  bestPhoto: Photo;
  cameraInfo: CameraInfo[];
}

export interface PopularOwner {
  total_views: number;
  username: string;
}

export interface UserSearchFilters {
  owner: string;
}

export interface MonthDataCount{
  count: number;
  month: number;
}

export interface FirstPost{
  year: number;
  months: MonthDataCount[]
};

//######################################

// Ricerca foto

export interface PhotoSearched {
  url: string;
  username: string;
  tags: string[];
  title: string;
  description: string;
  views: number;
  dateTaken: string;
  datePosted: string;
}

export interface PhotoSearchFilters {
  startDate: string;
  endDate: string;
  keyword: string;
  tags: string[];
}
