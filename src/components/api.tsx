import axios from "axios";

// Configura l'istanza base di Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8080", // Cambia con l'indirizzo del tuo backend
});

// Definizione dei tipi per i dati restituiti
export interface Photo {
  id: string;
  title: string;
  dateTaken: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  tags?: string[];
}

export interface AverageTimeResponse {
  averageTime: number;
}

export interface ProVsNonProResponse {
  proUsers: number;
  nonProUsers: number;
}

// Funzioni per le chiamate API
export const getData = async (limit = 10): Promise<Photo[]> => {
  const response = await api.get(`/data`, { params: { limit } });
  return response.data;
};

export const getPhotosByCoordinates = async (limit = 10000): Promise<any[]> => {
  const response = await api.get(`/photosByCoordinates`, { params: { limit } });
  return response.data;
};

export const getPhotosByTag = async (tag: string, page = 1, pageSize = 100): Promise<Photo[]> => {
  const response = await api.get(`/photosByTag`, {
    params: { tag, page, page_size: pageSize },
  });
  return response.data;
};

export const getPhotosByDateRange = async (
  startDate: string,
  endDate: string,
  page = 1,
  pageSize = 100
): Promise<Photo[]> => {
  const response = await api.get(`/photosByDateRange`, {
    params: { startDate, endDate, page, page_size: pageSize },
  });
  return response.data;
};

export const getPhotosByLocation = async (
  lat: number,
  lon: number,
  radius: number,
  page = 1,
  pageSize = 100
): Promise<Photo[]> => {
  const response = await api.get(`/photosByLocation`, {
    params: { lat, lon, radius, page, page_size: pageSize },
  });
  return response.data;
};

export const getPhotoCountByMonth = async (): Promise<any[]> => {
  const response = await api.get(`/photoCountByMonth`);
  return response.data;
};

export const getPhotoCountByYear = async (): Promise<any[]> => {
  const response = await api.get(`/photoCountByYear`);
  return response.data;
};

export const getPhotoPerMonthByYear = async (year: number): Promise<any[]> => {
  const response = await api.get(`/photoPostedPerMonthByYear`,{ params: { year } });
  return response.data;
};



export const getAverageTimeToPost = async (): Promise<AverageTimeResponse> => {
  const response = await api.get(`/averageTimeToPost`);
  return response.data;
};

export const getProUsersVsNonPro = async (): Promise<ProVsNonProResponse> => {
  const response = await api.get(`/proUsersVsNonPro`);
  return response.data;
};

export const getAccuracyDistribution = async (): Promise<any[]> => {
  const response = await api.get(`/accuracyDistribution`);
  return response.data;
};

export const getCentroidsKMeans = async (
  k: number
): Promise<any[]> => {
  const response = await api.get(`/runKMeans`,{
    params: { k },
  });
  return response.data;
};
