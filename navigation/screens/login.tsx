import React, { useState } from 'react';
import { StyleSheet,Image, SafeAreaView, TextInput, Button, Alert, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TabLoginScreen() {
  // State management for text inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = () => {
    // Placeholder for navigation logic
    Alert.alert("Login Pressed", "Navigate to home screen.");
  };

  const onRegisterPress = () => {
    // Placeholder for navigation logic
    Alert.alert("Register Pressed", "Navigate to registration screen.");
  };

  const onForgotPress = () => {
    // Placeholder for navigation logic
    Alert.alert("Frogot Pressed", "Navigate to Frogot screen.");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Image
          source={require("../../assets/images/logo-placeholder.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>

        {/* Text input fields */}
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
        <TouchableOpacity
          onPress={onForgotPress}
          style={styles.registerContainer}
        >
          <Text style={styles.text}>Forgot Password</Text>
        </TouchableOpacity>

        {/* Login button */}
        <View style={styles.fixToText}>
          <Button title="Login" color={"#000000"} onPress={onLoginPress} />
        </View>
      </SafeAreaView>

      {/* Footer with Register Section */}
      <View style={styles.footer}>
        <View style={styles.registerContainer}>
          <Text style={styles.text} disabled>
            Don&apos;t have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={onRegisterPress}
            style={styles.registerContainer}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default TabLoginScreen;

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
