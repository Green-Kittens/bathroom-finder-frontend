import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../navigation/type";
import { getAllBathrooms } from "../controllers/bathroomController";
import { Facility as BathroomProfile } from "../types/facility";
import { useUser } from "@clerk/clerk-expo";
import { registerUser, getUserProfile } from "../controllers/userController";

const LAT_DELT = 0.0922;
const LON_DELT = 0.0421;

export default function MainScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [bathrooms, setBathrooms] = useState<BathroomProfile[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const nav = useNavigation<ScreenNavigationProp>();

  const checkAndCreateUserData = async () => {
    if (!isLoaded || !isSignedIn || !user) return;
    console.log("user!!:", user);
    try {
      const userProfile = await getUserProfile(user.id);
      if (!userProfile) {
        const emailAddress = user.primaryEmailAddress?.emailAddress;
        if (emailAddress) {
          await registerUser(
            user.id,
            emailAddress,
            [],
            [],
            new Date(),
            "", // No profile image URL
            `${user.firstName} ${user.lastName}`,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBathrooms = async () => {
    try {
      const fetchedBathrooms = await getAllBathrooms();
      setBathrooms(fetchedBathrooms);
    } catch (error) {
      console.error("Failed to fetch bathrooms,", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBathrooms();
    }, []),
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocation(await Location.getCurrentPositionAsync());
      }
    })();
  }, []);

  useEffect(() => {
    checkAndCreateUserData();
  }, [isLoaded, isSignedIn, user]);

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
