import React from "react";
import Review from "@/components/review";
import { ScrollView } from "react-native";

export default function FacilityReviewsScreen() {
  return (
    <ScrollView>
      {Review()}
      {Review()}
      {Review()}
      {Review()}
      {Review()}
    </ScrollView>
  );
}
