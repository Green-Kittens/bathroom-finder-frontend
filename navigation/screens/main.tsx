import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../type";

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
  }, []);

  const nav = useNavigation<ScreenNavigationProp>();

  if (location === undefined) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
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
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude + 0.001,
            longitude: location.coords.longitude + 0.001,
          }}
          onPress={() => {
            nav.navigate("FacilityProfile");
          }}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
