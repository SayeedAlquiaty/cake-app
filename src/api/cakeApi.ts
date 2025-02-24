import axios from 'axios';
import { Cake } from '../types/Cake';

const API_URL = 'https://localhost:7111/api/cakes'; // Adjust URL as needed
const FAVOURITES = 'favourites'; // Adjust URL as needed

export const getCakes = async (): Promise<Cake[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCakeById = async (id: number): Promise<Cake> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addFavouriteCake = async (cake: Omit<Cake, 'id'>): Promise<Cake> => {
  const response = await axios.post(API_URL, cake);
  return response.data;
};

export const getFavouriteCakes = async (): Promise<Cake[]> => {
  const response = await axios.get(`${API_URL}/${FAVOURITES}`);
  return response.data;
};

export const getFavouriteCakeById = async (id: number): Promise<Cake> => {
  const response = await axios.get(`${API_URL}/${FAVOURITES}/${id}`);
  return response.data;
};