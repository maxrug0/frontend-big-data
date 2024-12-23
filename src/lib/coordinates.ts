import { Coordinate } from './types';

export async function loadCoordinates(): Promise<Coordinate[]> {
  try {
    const response = await fetch('/src/data/coordinates.txt');
    const text = await response.text();
    
    // Parse the text content into an array
    const rawData = JSON.parse(text) as [number, number, number][];
    
    // Transform the data and repeat points based on frequency
    return rawData.flatMap(([lat, lon, frequency]) => 
      // Create an array of repeated points
      Array(frequency).fill({
        position: [lon, lat], // DeckGL expects [longitude, latitude]
        intensity: 1 // Each individual point has intensity 1
      })
    );
  } catch (error) {
    console.error('Error loading coordinates:', error);
    return [];
  }
}
