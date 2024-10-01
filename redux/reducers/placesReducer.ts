import { PlacesState } from '../types';

const initialState: PlacesState = {
  searchResults: [],
  searchHistory: [],
  selectedPlace: null,
};

const placesReducer = (state = initialState, action: any): PlacesState => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'ADD_TO_SEARCH_HISTORY':
      const updatedHistory = [...state.searchHistory, action.payload];
      console.log('Updated Search History:', updatedHistory); // Log the updated search history
      return { ...state, searchHistory: updatedHistory };
    case 'SET_SELECTED_PLACE':
      return { ...state, selectedPlace: action.payload };
    default:
      return state;
  }
};

export default placesReducer;