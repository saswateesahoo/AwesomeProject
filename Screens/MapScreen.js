import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Request location permissions
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location so we can know where you are.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // You have the permission to access location
          Geolocation.getCurrentPosition(
            position => {
              setCurrentLocation(position.coords);
            },
            error => {
              console.error('Error getting location: ', error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.error(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <MapView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 37.78825,
          longitude: currentLocation ? currentLocation.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default MapScreen;
