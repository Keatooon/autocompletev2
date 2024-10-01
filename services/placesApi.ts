import axios from 'axios';
import { Place } from '../redux/types';

// const API_KEY = 'YOUR_GOOGLE_API_KEY';
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export const searchPlaces = async (query: string): Promise<Place[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        input: query,
        key: API_KEY,
      },
    });

    const predictions = response.data.predictions;

    // Fetch details for each prediction
    const places = await Promise.all(predictions.map(async (prediction: any) => {
      const detailsResponse = await axios.get(DETAILS_URL, {
        params: {
          place_id: prediction.place_id,
          key: API_KEY,
        },
      });
      const location = detailsResponse.data.result.geometry.location;
      return {
        id: prediction.place_id,
        description: prediction.description,
        lat: location.lat,
        lng: location.lng,
      };
    }));

    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
};