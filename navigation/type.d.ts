import type { NativeStackScreenProps } from "@react-navigation/native-stack";

/// <reference types="nativewind/types" />

export type ScreensParamList = {
  FacilityForm: undefined;
  FacilityProfile: undefined;
  FacilityReviews: undefined;
  Login: undefined;
  Main: undefined;
  ReviewForm: undefined;
  UserProfile: undefined;
  Back: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type ScreenNavigationProp = NativeStackScreenProps<
  FacilityForm,
  FacilityProfile,
  FacilityReviews,
  Login,
  Main,
  ReviewForm,
  UserProfile,
  Back,
  Register,
  ForgotPassword
>;
