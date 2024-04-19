import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title?: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title = "Title",
  color = "#344f33",
}) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 36,
    color: "white",
    backgroundColor: "#344f33",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
