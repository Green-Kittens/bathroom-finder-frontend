// components/PasswordStrengthMeter.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import zxcvbn, { ZXCVBNResult } from "zxcvbn";

const PasswordStrengthMeter = ({
  password,
  onPasswordStrengthChange,
}: {
  password: string;
  onPasswordStrengthChange: (isStrongEnough: boolean) => void;
}) => {
  useEffect(() => {
    onPasswordStrengthChange(strength.score >= 3); // Assuming score >= 3 is strong enough
  }, [password]);
  if (password === "") return null;
  const strength = zxcvbn(password);

  const getStrengthFeedback = (score: number) => {
    switch (score) {
      case 0:
        return {
          text: "Very Weak",
          color: "red",
          icon: "close-circle" as const,
        };
      case 1:
        return { text: "Weak", color: "orange", icon: "alert" as const };
      case 2:
        return {
          text: "Fair",
          color: "#DBBD40",
          icon: "remove-circle" as const,
        };
      case 3:
        return { text: "Good", color: "#8FDB00", icon: "add-circle" as const };
      case 4:
        return {
          text: "Strong",
          color: "green",
          icon: "checkmark-circle" as const,
        };
      default:
        return { text: "Unknown", color: "gray", icon: "help-circle" as const };
    }
  };

  const getCustomFeedback = (result: ZXCVBNResult) => {
    if (result.score === 0)
      return "Not Strong enough, Try adding more characters.";
    if (result.score === 1)
      return "Not Strong enough, Try adding numbers or symbols.";
    if (result.score === 2)
      return "Not Strong enough, Try adding more words or capital letters.";
    if (result.score === 3) return "Try adding more characters or symbols.";
    if (result.score === 4) return "Password is strong!";
    return "undefined";
  };

  const feedback = getStrengthFeedback(strength.score);
  const customFeedback = getCustomFeedback(strength);

  return (
    <View style={styles.container}>
      <View
        style={[styles.strengthContainer, { backgroundColor: feedback.color }]}
      >
        <Text style={styles.strengthText}>{feedback.text}</Text>
        <Ionicons
          name={feedback.icon}
          size={20}
          color="white"
          style={styles.icon}
        />
      </View>
      <Text style={styles.feedback}>{customFeedback}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  strengthContainer: {
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    maxWidth: 120,
  },
  strengthText: {
    alignSelf: "center",
    color: "white",
    padding: 5,
    fontSize: 18,
  },
  icon: {
    alignContent: "center",
    marginTop: 5,
    marginRight: 5,
  },
  feedback: {
    fontSize: 16,
    fontFamily: "EudoxusSans-Regular",
    color: "black",
    padding: 5,
  },
});

export default PasswordStrengthMeter;
