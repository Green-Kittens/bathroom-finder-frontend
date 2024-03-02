import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// screens 
import FacilityProfile from './screens/facility-profile';
import FacilityReviews from './screens/facility-reviews';
import Login from './screens/login';
import Main from './screens/main';
import ReviewForm from './screens/review-form';
import UserProfile from './screens/user-profile';

// screen names 
const facilityProfileName = "Facility Profile";
const facilityReviewsName = "Facility Reviews";
const loginName = "Login";
const mainName = "Main";
const reviewFormName = "Review Form";
const userProfileName = "User Profile";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={mainName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let current = route.name;

            if (current === mainName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (current === reviewFormName) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';

            } else if (current === userProfileName) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}> 

        <Tab.Screen name={mainName} component={Main} />
        <Tab.Screen name={reviewFormName} component={ReviewForm} />
        <Tab.Screen name={userProfileName} component={UserProfile} />

      </Tab.Navigator> 
    </NavigationContainer>
  );
}
