import axios from "axios";
import type { ClusterData, AssociationRule } from "@/lib/types";

const api = axios.create({
  //baseURL: "https://bqgq98pb-8080.euw.devtunnels.ms", 
  baseURL: "http://localhost:8080", 
});


// ########## MAPS ##########

// Clusters
export const getCentroidsKMeans = async (k: number): Promise<ClusterData[]> => {
  const response = await api.get(`/runKMeans`, {params: { k }});
  return response.data;
};

// ########## ANALYTICS ##########

// PhotoTrends
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

// TagRules
export const getAssociationRules = async(): Promise<AssociationRule[]> => {
  const response = await api.get('//tagAssociationRules')
  return response.data;
}

// ########## USERS-PHOTOS ##########

// TopOwners
export const getTopOwners = async (): Promise<any[]> => {
  const response = await api.get(`/topOwners`);
  return response.data;
};
