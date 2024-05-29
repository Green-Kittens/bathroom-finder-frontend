import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../navigation/type";
import { getAllBathrooms } from "../controllers/bathroomController";
import { Facility as BathroomProfile } from "../types/facility";

const LAT_DELT = 0.0922;
const LON_DELT = 0.0421;

export default function MainScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [bathrooms, setBathrooms] = useState<BathroomProfile[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocation(await Location.getCurrentPositionAsync());
      }
    })();

    // fetching all bathroom facilities
    (async () => {
      try {
        const fetchBathrooms = await getAllBathrooms();
        setBathrooms(fetchBathrooms);
      } catch (error) {
        console.error("Failed to fetch bathrooms", error);
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
        {bathrooms.map(
          (
            bathroom, // render all facility locations as markers on map
          ) => (
            <Marker
              key={bathroom._id}
              coordinate={{
                latitude: bathroom.Coordinates[0],
                longitude: bathroom.Coordinates[1],
              }}
              onPress={() => {
                nav.navigate("FacilityProfile", { bathroom });
              }}
            />
          ),
        )}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
