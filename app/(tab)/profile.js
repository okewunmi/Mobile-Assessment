import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { fetchLatestCoord } from '../../lib/appwrite';

const Profile = () => {
  const [coord, setCoord] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const latestCoord = await fetchLatestCoord();
        if (latestCoord) {
          setCoord(latestCoord);
          await reverseGeocode(latestCoord.latitude, latestCoord.longitude);
        } else {
          setError("No coordinates found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch location.");
      } finally {
        setLoading(false);
      }
    };

    getCoordinates();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const geoData = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geoData.length > 0) {
        setAddress(geoData[0]);  // Get the first result
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View>
        <Text style={styles.txt}>Your Current Location:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <Text style={styles.txt}>Lat: {coord?.latitude}</Text>
            <Text style={styles.txt}>Lng: {coord?.longitude}</Text>
            {address && (
              <>
                <Text style={styles.txt}>City: {address.city || 'N/A'}</Text>
                <Text style={styles.txt}>Region: {address.region || 'N/A'}</Text>
                <Text style={styles.txt}>Country: {address.country || 'N/A'}</Text>
                <Text style={styles.txt}>Postal Code: {address.postalCode || 'N/A'}</Text>
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

