import { useEffect, useState } from 'react';
import { StyleSheet, View, Text , Alert} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { explorationPoints } from '../Data/explorationPoints';
import type { RootStackScreenProps } from './types'; 
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';


const MaxDistance = 75;

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000;

  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function MapScreen() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  
  const [selectedPoint, setSelectedPoint] =
    useState<(typeof explorationPoints)[number] | null>(null);
    
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const getLocation = async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }
      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      setLocation(currentLocation);
    };

    getLocation();
  }, []);

  const encounter = (point: typeof explorationPoints[number]) => {
    if (!location) {
      Alert.alert("Oh no!", "Unable to find your location.");
      return;
    }

    const distance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      point.latitude,
      point.longitude
    );

    if (distance <= MaxDistance) {
      navigation.navigate('Encounter'); 
    } else {
      Alert.alert("Oh no!", "You are too far away.");
    }
  };
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your location"
            description="You are here!"
            pinColor="green"
          />
        )}
        {explorationPoints.map((point) => (
        <Marker
          key={point.id}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          title={point.name}
          description={point.description}
          pinColor="purple"
          onPress={() => {
            setSelectedPoint(point);
            encounter(point);
          }}
        />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});