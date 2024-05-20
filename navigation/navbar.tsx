import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// types
import { ScreensParamList } from "./type";

// screens
import Main from "./screens/main";
import UserProfile from "./screens/user-profile";
import FacilityForm from "./screens/facility-form";

// screen names
const mainName = "Main";
const userProfileName = "UserProfile";
const facilityFormName = "FacilityForm";

// navigation
const Tab = createBottomTabNavigator<ScreensParamList>();

export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName={mainName} // ask about implementing login as initial page display
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#328281",
        },
        tabBarActiveBackgroundColor: "#408E88",
        tabBarItemStyle: {
          borderRadius: 15,
          marginHorizontal: 8,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          const current = route.name;

          if (current === mainName) {
            iconName = focused ? "home" : "home-outline";
          } else if (current === userProfileName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (current === facilityFormName) {
            iconName = focused ? "pin" : "pin-outline";
          }
          return <Ionicons name={iconName} size={size} color={"#C5D8DB"} />;
        },
      })}
    >
      <Tab.Screen
        name={facilityFormName}
        component={FacilityForm}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={mainName}
        component={Main}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={userProfileName}
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
