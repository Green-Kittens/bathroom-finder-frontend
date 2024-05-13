import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@clerk/clerk-expo";
// types
import { ScreensParamList } from "./type";

// screens
import Main from "../screens/main";
import UserProfile from "../screens/user-profile";
import FacilityForm from "../screens/facility-form";
import Login from "../screens/login";

// screen names
const mainName = "Main";
const userProfileName = "UserProfile";
const facilityFormName = "FacilityForm";
const userLoginName = "Login";

// navigation
const Tab = createBottomTabNavigator<ScreensParamList>();

export default function NavBar() {
  const { isSignedIn } = useUser();
  return (
    <Tab.Navigator
      initialRouteName={mainName} // ask about implementing login as initial page display
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const current = route.name;

          if (current === mainName) {
            iconName = focused ? "home" : "home-outline";
          } else if (current === userProfileName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (current === facilityFormName) {
            iconName = focused ? "pin" : "pin-outline";
          } else if (current === userLoginName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {isSignedIn && (
        <Tab.Screen name={facilityFormName} component={FacilityForm} />
      )}
      <Tab.Screen name={mainName} component={Main} />
      {isSignedIn && (
        <Tab.Screen name={userProfileName} component={UserProfile} />
      )}
      {!isSignedIn && (
        <Tab.Screen
          name={userLoginName}
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Tab.Navigator>
  );
}
