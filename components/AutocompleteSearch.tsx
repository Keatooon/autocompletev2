import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { searchPlacesAsync, setSelectedPlace, setSearchResults } from '../redux/actions/placesActions';
import { RootState, Place } from '../redux/types';
import { AnyAction, Dispatch } from 'redux'; // Add Dispatch import

const AutocompleteSearch: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch(); // Specify dispatch type
  const [query, setQuery] = useState('');
  const [selectedDescription, setSelectedDescription] = useState(''); // New state for selected place description
  const searchResults = useSelector((state: RootState) => state.places.searchResults);
  const searchHistory = useSelector((state: RootState) => state.places.searchHistory);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      dispatch(searchPlacesAsync(text) as unknown as AnyAction); 
    } else {
      dispatch(setSearchResults([])); // Clear search results
    }
  };

  const handleSelect = (place: Place) => {
    dispatch(setSelectedPlace(place) as unknown as AnyAction); 
    setSelectedDescription(place.description); // Set the selected place description
    setQuery(''); // Clear the text input
    dispatch(setSearchResults([])); // Clear the search results when a place is selected
  };

  // Debugging logs
  console.log("Search Results:", searchResults);
  console.log("Search History:", searchHistory);

  // Determine which data to display in the FlatList
  const dataToDisplay = query ? searchResults : searchHistory;

  return (
    <View style={styles.container}>
      {selectedDescription ? ( // Display the selected description above the map
        <Text style={styles.selectedDescription}>{selectedDescription}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search for a place"
      />
      {query ? null : ( // Show "Recent" only when there is no query
        <Text style={styles.recentHeading}>Recent Searches:</Text> // Add Recent heading
      )}
      <FlatList
        data={dataToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text style={styles.item}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Add styles for the selected description
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#B2BEB5', 
    borderBottomWidth: 2, 
    borderBottomColor: '#B2BEB5', 
  },
  selectedDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentHeading: {
    fontSize: 14, // Smaller font size
    color: 'gray', // Subtle color
    marginBottom: 10,
    marginTop: 20,

  },
});

export default AutocompleteSearch;