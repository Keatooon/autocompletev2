export interface Place {
    id: string;
    description: string;
    lat: number;
    lng: number;
}

export interface PlacesState {
    searchResults: Place[];
    searchHistory: Place[];
    selectedPlace: Place | null;
}

export interface RootState {
    places: PlacesState;
}