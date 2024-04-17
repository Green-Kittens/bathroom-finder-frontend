import { GestureResponderEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

export default function MainButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
) {
  return (
    <Button
      title={words}
      titleStyle={styles.text}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#6da798", "#5CA59E"],
        start: [1, 0],
        end: [0.2, 0],
      }}
      buttonStyle={{
        borderWidth: 0,
        borderColor: "transparent",
        borderRadius: 5,
      }}
      containerStyle={styles.container}
      onPress={onpress}
    />
  );
}

export function LightButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
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
      buttonStyle={styles.button}
      containerStyle={styles.container}
      onPress={onpress}
    />
  );
}

export function CancelButton(
  words: string,
  onpress: ((event: GestureResponderEvent) => void) | undefined,
) {
  return (
    <Button
      title={words}
      titleStyle={styles.text}
      color={"#FC6769"}
      buttonStyle={styles.button}
      containerStyle={styles.container}
      onPress={onpress}
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
