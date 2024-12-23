import { Coordinate, CoordinateData } from './types';

export async function loadCoordinates(): Promise<Coordinate[]> {
  try {
    const response = await fetch('/src/data/coordinates.txt');
    const text = await response.text();
    
    // Parse the text content into an array
    const rawData = JSON.parse(text) as [number, number, number][];
    
    // Transform the data into the required format
    return rawData.map(([lat, lon, intensity]) => ({
      position: [lon, lat], // DeckGL expects [longitude, latitude]
      intensity
    }));
  } catch (error) {
    console.error('Error loading coordinates:', error);
    return [];
  }
}