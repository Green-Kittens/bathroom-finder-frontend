import React, { useState } from 'react';
import { StyleSheet,Image, SafeAreaView, TextInput, Button, Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

function TabLoginScreen() {
  // State management for text inputs
  const [email, setEmail] = useState("");


  const onSubmitPress = () => {
    // Placeholder for navigation logic
    Alert.alert("Submit Pressed", "Navigate to Forgot-confirmation screen.");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Image
          source={require("../../assets/images/logo-placeholder.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Forgot-Password</Text>

        {/* Text input fields */}
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email:"
        />

        {/* Login button */}
        <View style={styles.fixToText}>
          <Button title="Login" color={"#000000"} onPress={onSubmitPress} />
        </View>
      </SafeAreaView>
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
  // Logo
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 5,
  },
});
