import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  ScrollView,
} from "react-native";

export default function RegisterScreen() {
  // State management for text inputs
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterPress = () => {
    // Placeholder for navigation logic
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Image
            source={require("../../assets/images/uploadImage.jpg")}
            style={styles.upload}
          />
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lasttName}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
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
            //implemtation to check against initially entered password
            value={password}
            placeholder="Confirm Password"
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
    </ScrollView>
  );
}

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
    marginBottom: 20,
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
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  // choose profile picture
  upload: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "black",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
