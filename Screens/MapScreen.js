// import React, {useEffect, useState} from 'react';
// import {View, PermissionsAndroid, StyleSheet} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// const MapScreen = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   useEffect(() => {
//     // Request location permissions
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message:
//               'This app needs access to your location so we can know where you are.',
//           }
//         );
//         console.log('Location permission granted:', granted);

//         if (granted === 'granted') {
//           Geolocation.getCurrentPosition(
//             position => {
//               setCurrentLocation(position.coords);
//               console.log('Current location:', position.coords);
//             },
//             error => {
//               console.error('Error getting location: ', error);
//             },
//             {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000},
//             //enableHighAccuracy: false, timeout: 5000, maximumAge: 10000
//           );
//         } else {
//           console.warn('Location permission denied');
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{width: '100%', height: '100%'}} 
//         initialRegion={{
//           latitude: currentLocation ? currentLocation.latitude : 20.3224716,
//           longitude: currentLocation ? currentLocation.longitude : 84.866077,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}>
//         {/* Custom marker for the current location */}
//         {currentLocation && (
//           <Marker
//             coordinate={{
//               latitude: currentLocation.latitude,
//               longitude: currentLocation.longitude,
//             }}
//             title="You are here"
//             description="This is your current location"
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });
// export default MapScreen;

//The below code - distance between my current location delhi location (using Haversine formula)

import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const delhiLocation = {
    latitude: 28.6139, // Delhi latitude
    longitude: 77.209, // Delhi's longitude
  };
  const [distance, setDistance] = useState(null);

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
        console.log('Location permission granted:', granted);

        if (granted === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setCurrentLocation(position.coords);
              console.log('Current location:', position.coords);

              // Calculate the distance using the Haversine formula
              if (currentLocation) {
                const haversine = (lat1, lon1, lat2, lon2) => {
                  const R = 6371; // Earth's radius in kilometers (r = radius)
                  const dLat = (lat2 - lat1) * (Math.PI / 180);
                  const dLon = (lon2 - lon1) * (Math.PI / 180);
                  const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * (Math.PI / 180)) *
                      Math.cos(lat2 * (Math.PI / 180)) *
                      Math.sin(dLon / 2) *
                      Math.sin(dLon / 2);
                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  return R * c;
                };


                const calculatedDistance = haversine(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  delhiLocation.latitude,
                  delhiLocation.longitude,
                );

                setDistance(calculatedDistance.toFixed(2) + ' km');
              }
            },
            error => {
              console.error('Error getting location: ', error);
            },
            {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000},
          );
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.error(err);
      }
    };
    requestLocationPermission();
  }, [delhiLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={{width: '100%', height: '80%'}}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 28.6139, // Delhi's latitude
          longitude: currentLocation ? currentLocation.longitude : 77.209, // Delhi's longitude
          latitudeDelta: 0.092,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {/* Custom marker for Delhi's location */}
        <Marker
          coordinate={{
            latitude: delhiLocation.latitude,
            longitude: delhiLocation.longitude,
          }}
          title="Delhi"
        />
      </MapView>
      <Text style={styles.distanceText}>Distance to Delhi:--{distance}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  distanceText: {
    fontSize: 18,
    padding: 16,
    color: 'black',
  },
});
export default MapScreen;