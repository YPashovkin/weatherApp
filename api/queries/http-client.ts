import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.weatherapi.com',
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    key: '', // Replace with your actual API key 
  },
  timeout: 10000,
});
