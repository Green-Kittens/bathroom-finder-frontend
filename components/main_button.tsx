import { GestureResponderEvent, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import React from "react";

export default function MainButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | null | undefined,
) {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#6da798", "#40a4a9"]}
      end={{ x: 0.1, y: 0.2 }}
      style={styles.button}
    >
      <Pressable onPress={onpress}>
        <Text>{words}</Text>
      </Pressable>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
