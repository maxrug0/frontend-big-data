import { Coordinate, CoordinateData } from './types';
import { getCoordinates } from '@/components/api/api'; // Importa la funzione dell'API

export async function loadCoordinates(): Promise<Coordinate[]> {
  try {
    // Recupera i dati dall'API
    const coordinateDataArray: CoordinateData[] = await getCoordinates();
    console.log(coordinateDataArray);

    // Trasforma CoordinateData in Coordinate
    const transformedCoordinates: Coordinate[] = coordinateDataArray.map(data => ({
      position: [data.longitude, data.latitude], // Converti in [longitude, latitude]
      intensity: data.intensity // Mantieni l'intensità
    }));

    return transformedCoordinates;
  } catch (error) {
    console.error('Errore nel caricamento delle coordinate:', error);
    return [];
  }
}
