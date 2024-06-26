// components/PasswordInput.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  style,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: ViewStyle;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.passwordContainer, style]}>
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#000"
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {passwordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    padding: 10,
    width: 325,
    height: 40,
    backgroundColor: "#FFFFFF",
    margin: 5,
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleButtonText: {
    color: "black",
  },
});

export default PasswordInput;
