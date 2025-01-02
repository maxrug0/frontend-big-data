import axios from "axios";
import type { TagsResponse, AssociationRule, CoordinateData, KMeansResponse, PhotoSearched, PhotoCount, HourData, OwnerSearched, PopularOwner, FirstPost } from "@/lib/types";

const api = axios.create({
  baseURL: "https://bqgq98pb-8080.euw.devtunnels.ms", 
  //baseURL: "https://fp9w3qjx-8080.euw.devtunnels.ms", 
  //baseURL: "http://127.0.0.1:8081", 
});


// ########## MAPS ##########

// Clusters
export const getCoordinates = async (): Promise<CoordinateData[]> => {
  const response = await api.get(`/photosByCoordinates`);
  return response.data;
};

// Clusters
export const KMeans = async (k: number): Promise<KMeansResponse> => {
  const response = await api.get(`/runKMeans`, {params: { k }});
  return response.data;
};

// ########## ANALYTICS ##########

// PhotoTrends
export const getPhotoTakenCount = async (): Promise<PhotoCount> => {
  const response = await api.get(`/photoCountTaken`);
  return response.data;
};

export const getPhotoPostedCount = async (): Promise<PhotoCount> => {
  const response = await api.get(`/photoCountPosted`);
  return response.data;
};

export const getPhotoPerMonthByYear = async (year: number, type: string): Promise<any[]> => {
  const response = await api.get(`/photoPostedPerMonthByYear`,{ params: { year, type } });
  return response.data;
};

export const getPhotoCountHour = async (): Promise<HourData> => {
  const response = await api.get(`/photoCountHour`);
  return response.data;
};

// TagRules
export const topTags = async (page_size: number): Promise<TagsResponse[]> => {
  const response = await api.get(`/topTags`, { params: { page_size } });
  return response.data;
};

export const getAssociationRules = async(min_support: number, min_confidence: number, target_tags: string[] = []): Promise<AssociationRule[]> => {
  try {
    const response = await api.post(`/tagAssociationRules`, {min_support, min_confidence, target_tags});
    return response.data;
  } catch (error) {
    console.error("Error searching rules:", error);
    throw error;
  }
};

// ########## USERS-PHOTOS ##########

// TopOwners
export const getOwners = async (): Promise<OwnerSearched[]> => {
  const response = await api.get(`/top50Owners`);
  return response.data;
};

export const getPopularOwners = async (): Promise<PopularOwner[]> => {
  const response = await api.get(`/top50Owners`);
  return response.data;
};

export const getFirstPostPerYear = async (): Promise<FirstPost[]> => {
  const response = await api.get(`/firstPostPerYear`);
  return response.data;
};

// PhotoSearch
export const getPhotos = async (keyword: string, dataInizio: string, dataFine: string, tagList: string[] = []): Promise<PhotoSearched[]> => {
  try {
    const response = await api.post(`/search_photos`, {keyword, dataInizio, dataFine, tag_list: tagList});
    return response.data;
  } catch (error) {
    console.error("Error searching photos:", error);
    throw error;
  }
};

