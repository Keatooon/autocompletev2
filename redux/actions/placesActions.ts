import { ThunkAction } from 'redux-thunk';
import { RootState, Place } from '../types';
import { searchPlaces } from '../../services/placesApi';

export const setSearchResults = (results: Place[]) => ({
  type: 'SET_SEARCH_RESULTS' as const,
  payload: results,
});

export const addToSearchHistory = (place: Place) => {
  console.log('wk Adding to search history:', place);
  return {
    type: 'ADD_TO_SEARCH_HISTORY' as const,
    payload: place,
  };
};

export const setSelectedPlace = (place: Place): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  dispatch({
    type: 'SET_SELECTED_PLACE' as const,
    payload: place,
  });
    dispatch(addToSearchHistory(place));
};

export const searchPlacesAsync = (query: string): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    const results = await searchPlaces(query);
    console.log('wk3', results);
    dispatch(setSearchResults(results));
    // dispatch(addToSearchHistory(query));
  } catch (error) {
    console.error('Error searching places:', error);
  }
};

export type PlacesActionTypes = 
  | ReturnType<typeof setSearchResults>
  | ReturnType<typeof addToSearchHistory>
  | ReturnType<typeof setSelectedPlace>;