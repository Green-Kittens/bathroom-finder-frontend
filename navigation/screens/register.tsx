import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Alert,
  Text,
  View,
} from "react-native";
import MainButton from "../../components/Buttons";
import { ScrollView } from "react-native-gesture-handler";

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
      <ImageBackground
        source={require("../../assets/images/blob.png")}
        style={{
          width: 953,
          height: 1069,
          position: "absolute",
          top: 200,
          left: -650,
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
      <ScrollView style={{ height: "100%" }}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.outerTextContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.basicText}>First Name:</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="First Name"
          />
          <View style={styles.outerTextContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.basicText}>Last Name:</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Last Name"
          />
          <View style={styles.outerTextContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.basicText}>Username:</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
          />
          <View style={styles.outerTextContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.basicText}>Password:</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View style={styles.outerTextContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.basicText}>Confirm Password:</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Confirm Password"
          />
          <View style={[styles.fixToText, { marginBottom: 20 }]}>
            {MainButton("Register", onRegisterPress)}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#EEF8F7",
  },
  outerTextContainer: {
    width: "75%",
  },
  innerTextContainer: {
    alignSelf: "flex-start",
  },
  basicText: {
    fontFamily: "EudoxusSans-Bold",
    fontSize: 15,
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
    marginBottom: 20,
    fontFamily: "EudoxusSans-Bold",
  },
  // Input Section
  input: {
    height: 40,
    width: "75%", // Control the width of the input size
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    fontFamily: "EudoxusSans-Regular",
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
    borderRadius: 50,
  },
});
