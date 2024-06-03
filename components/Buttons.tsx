import { GestureResponderEvent, StyleProp, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { ViewStyle } from "react-native";

export default function MainButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
  disabled?: boolean,
  styling?: StyleProp<ViewStyle>,
  textStyling?: StyleProp<TextStyle>,
) {
  return (
    <Button
      title={words}
      titleStyle={[styles.text, textStyling]}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#7FC6B3", "#74C9C0"],
        start: [1, 0],
        end: [0.2, 0],
      }}
      buttonStyle={[styles.button, styling]}
      containerStyle={styles.container}
      onPress={onpress}
      disabled={disabled}
    />
  );
}

export function LightButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
  disabled?: boolean,
  styling?: StyleProp<ViewStyle>,
) {
  return (
    <Button
      title={words}
      titleStyle={styles.text}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#F9FEFD", "#DEF4EF"],
        start: [1, 0],
        end: [0.2, 0],
      }}
      buttonStyle={[styles.button, styling]}
      containerStyle={styles.container}
      onPress={onpress}
      disabled={disabled}
    />
  );
}

export function SecondaryButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
  disabled?: boolean,
  styling?: StyleProp<ViewStyle>,
  textStyling?: StyleProp<TextStyle>,
) {
  return (
    <Button
      title={words}
      titleStyle={[styles.text, { color: "white" }, textStyling]}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#044962", "#254A5E"],
        start: [1, 0],
        end: [0.2, 0],
      }}
      buttonStyle={[styles.button, styling]}
      containerStyle={{
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
      }}
      onPress={onpress}
      disabled={disabled}
    />
  );
}

export function CancelButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
  disabled?: boolean,
  styling?: StyleProp<ViewStyle>,
) {
  return (
    <Button
      title={words}
      titleStyle={styles.text}
      color={"#FC6769"}
      buttonStyle={[styles.button, styling]}
      containerStyle={styles.container}
      onPress={onpress}
      disabled={disabled}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 5,
  },
  text: {
    color: "black",
    fontSize: 17,
    padding: 20,
  },
});
