import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./navbar";

// types
import { ScreensParamList } from "./type";

// screens
import FacilityProfile from "./screens/facility-profile";
import FacilityReviews from "./screens/facility-reviews";
import Login from "./screens/login";

// screen names
const headName = "Head";
const facilityProfileName = "FacilityProfile";
const facilityReviewsName = "FacilityReviews";
const loginName = "Login";

// navigation
const Stack = createStackNavigator<ScreensParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={headName}
        component={NavBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={facilityProfileName}
        component={FacilityProfile}
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#EEF8F7" },
        }}
      />
      <Stack.Screen
        name={facilityReviewsName}
        component={FacilityReviews}
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#EEF8F7" },
        }}
      />
      <Stack.Screen
        name={loginName}
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
