import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function RegisterScreen() {
  // State management for text inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterPress = () => {
    // Placeholder for navigation logic
    Alert.alert("Register Pressed", "Navigate to registration screen.");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Image
          source={require("../../assets/images/logo-placeholder.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="First Name:"
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Last Name:"
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username:"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Confirm Password:"
        />
        <View style={styles.fixToText}>
          <Button
            title="Register"
            color={"#000000"}
            onPress={onRegisterPress}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  // Safe Area Section
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Title Section
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
  },
  // Input Section
  input: {
    height: 40,
    width: "30%", // Control the width of the input size
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
  },
  // Text Section
  text: {
    alignSelf: "center",
  },
  // Button Section
  fixToText: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  // Footer Section
  footer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  // Register Section
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  // Register Text
  registerText: {
    color: "black",
    fontWeight: "bold",
  },
  // Logo
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 5,
  },
});
