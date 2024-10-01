import React from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { RootState } from '../redux/types';

const Map: React.FC = () => {
  const selectedPlace = useSelector((state: RootState) => state.places.selectedPlace);
  console.log("wk2", selectedPlace); // Log selectedPlace

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={selectedPlace ? { // Update to use region prop
          latitude: selectedPlace.lat,
          longitude: selectedPlace.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.lat,
              longitude: selectedPlace.lng,
            }}
            title={selectedPlace.description}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;