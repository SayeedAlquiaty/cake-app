import axios from 'axios';
import { Cake } from '../types/Cake';

const API_URL = 'https://localhost:7111/api/cakes'; // Adjust URL as needed

export const getCakes = async (): Promise<Cake[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
