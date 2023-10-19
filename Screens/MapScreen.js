// import React, {useEffect, useState} from 'react';
// import {View, PermissionsAndroid} from 'react-native';
// import MapView from 'react-native-maps';
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
//         // console.log(granted);
//         if (granted === 'granted') {
//           // console.log("access");
//           // You have the permission to access location
//           Geolocation.getCurrentPosition(
//             position => {
//               setCurrentLocation(position.coords);
//               console.log(position);
//             },
//             error => {
//               console.error('Error getting location: ', error);
//             },
//             {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000},
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
//     // eslint-disable-next-line react-native/no-inline-styles
//     <View style={{flex: 1}}>
//       <MapView
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: currentLocation ? currentLocation.latitude : 20.3240802,
//           longitude: currentLocation ? currentLocation.longitude : 84.866077,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     </View>

import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
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
        console.log('Location permission granted:', granted);

        if (granted === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setCurrentLocation(position.coords);
              console.log('Current location:', position.coords);
            },
            error => {
              console.error('Error getting location: ', error);
            },
            {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000},
            //enableHighAccuracy: false, timeout: 5000, maximumAge: 10000
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
    <View style={styles.container}>
      <MapView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '100%', height: '100%'}} 
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 20.3224716,
          longitude: currentLocation ? currentLocation.longitude : 84.866077,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}>
        {/* Custom marker for the current location */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="You are here"
            description="This is your current location"
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
    flex: 1,
  },
});

export default MapScreen;
