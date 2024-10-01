import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, Text, View } from 'react-native';
import { RootState } from '../redux/types';

const SearchHistory: React.FC = () => {
  const searchHistory = useSelector((state: RootState) => state.places.searchHistory);

  return (
    <FlatList
      data={searchHistory}
      keyExtractor={(item, index) => index.toString()} // Unique key for each item
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          {/* <Text>{item}</Text> */}
        </View>
      )}
      ListHeaderComponent={<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Search History</Text>}
    />
  );
};

export default SearchHistory;