import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native'; // Added SafeAreaView
import AutocompleteSearch from '../../components/AutocompleteSearch';
import Map from '../../components/Map';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AutocompleteSearch />
        <Map />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sider: {
    width: 300,
    backgroundColor: '#fff',
    padding: 24,
  },
});

export default HomeScreen;
