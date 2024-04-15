import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// types
import { ScreensParamList } from "./type";

// screens
import Main from "./screens/main";
import ReviewForm from "./screens/review-form";
import UserProfile from "./screens/user-profile";
import FacilityForm from "./screens/facility-form";

// screen names
const mainName = "Main";
const reviewFormName = "ReviewForm";
const userProfileName = "UserProfile";
const facilityFormName = "FacilityForm";

// navigation
const Tab = createBottomTabNavigator<ScreensParamList>();

export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName={mainName} // ask about implementing login as initial page display
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const current = route.name;

          if (current === mainName) {
            iconName = focused ? "home" : "home-outline";
          } else if (current === reviewFormName) {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (current === userProfileName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (current === facilityFormName) {
            iconName = focused ? "pin" : "pin-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={reviewFormName} component={ReviewForm} />
      <Tab.Screen name={facilityFormName} component={FacilityForm} />
      <Tab.Screen name={mainName} component={Main} />
      <Tab.Screen name={userProfileName} component={UserProfile} />
    </Tab.Navigator>
  );
}
