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
  Head: undefined;
};

export type ScreenNavigationProp = NativeStackScreenProps<
  ScreensParamList,
  FacilityForm,
  FacilityProfile,
  FacilityReviews,
  Login,
  Main,
  ReviewForm,
  UserProfile,
  Head
>;
