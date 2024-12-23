// Map configuration
export const INITIAL_VIEW_STATE = {
  longitude: 12.4964,
  latitude: 41.9028,
  zoom: 12, // Reduced zoom level to show more area
  pitch: 45,
  bearing: 0
} as const;

export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// Generate more sparse sample data points
export const SAMPLE_DATA = Array.from({ length: 300 }, () => ({
  position: [
    12.4964 + (Math.random() - 0.5) * 0.3, // Increased spread
    41.9028 + (Math.random() - 0.5) * 0.3,
  ],
  intensity: Math.random() * 100
}));
