import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.weatherapi.com',
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    key: '7203dc72e5f04453b7c112534250404', // Replace with your actual API key 
  },
  timeout: 10000,
});
