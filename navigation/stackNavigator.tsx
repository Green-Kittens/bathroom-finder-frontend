import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./navbar";

// types
import { ScreensParamList } from "./type";

// screens
import FacilityProfile from "../screens/facility-profile";
import FacilityReviews from "../screens/facility-reviews";
import Login from "../screens/login";
import Register from "../screens/register";
import ForgotPassword from "../screens/forgot-password";

// screen names
const headName = "Back";
const facilityProfileName = "FacilityProfile";
const facilityReviewsName = "FacilityReviews";
const loginName = "Login";
const registerName = "Register";
const forgotPasswordName = "ForgotPassword";

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
      <Stack.Screen name={facilityProfileName} component={FacilityProfile} />
      <Stack.Screen name={facilityReviewsName} component={FacilityReviews} />
      <Stack.Screen name={loginName} component={Login} />
      <Stack.Screen
        name={registerName}
        component={Register}
      />
      <Stack.Screen
        name={forgotPasswordName}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}
