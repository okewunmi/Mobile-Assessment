import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {getCoord} from '../../lib/appwrite'

const Home = () => {
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  useEffect(() => {
    const updateBackend = async (coords) => {
      setIsSubmitting(true);
      try {
        console.log("Updating backend with coords:", coords); // Debugging log
        const result = await getCoord(coords.latitude, coords.longitude);
        console.log("Coord saved result:", result); // Debugging log
        return result;
      } catch (error) {
        Alert.alert("Saving location failed", error.message || "An error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
  { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
  (loc) => {
    console.log("Location Updated:", loc.coords); // Debugging log
    setLocation(loc.coords);
    updateBackend(loc.coords);
  }
);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="Your Location" />
        </MapView>
      ) : (
        <Text>{errorMsg || 'Fetching location...'}</Text>
      )}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { width: '100%', height: '100%' },
});