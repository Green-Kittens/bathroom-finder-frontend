import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

import * as Location from "expo-location";

const LAT_DELT = 0.0922;
const LON_DELT = 0.0421;

export default function MainScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocation(await Location.getCurrentPositionAsync());
      }
    })();
  }, [location]);

  if (location === undefined) {
    return <Text>Location acquisition in progress...</Text>;
  } else {
    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LAT_DELT,
          longitudeDelta: LON_DELT,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
