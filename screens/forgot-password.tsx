import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Text,
  View,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function TabSubmitScreen() {
  // State management for text inputs
  const [emailAddress, setEmailAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = React.useState("");

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmitPress = () => {
    // Placeholder for navigation logic
    setModalVisible(true);
  };

  const onClosePress = () => {
    // Placeholder for navigation logic
    setModalVisible(false);
  };

    // Handle email change and validation
    const handleEmailChange = (input: string) => {
      setEmailAddress(input);
      if (input === "") {
        setEmailError("");
      } else if (!emailRegex.test(input)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.text}>Email has been sent to {emailAddress}</Text>
              <Button title="Close" color={"#000000"} onPress={onClosePress} />
            </View>
          </Modal>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Forgot-Password</Text>

          {/* Text input fields */}
          <TextInput
            style={styles.input}
            onChangeText={setEmailAddress}
            value={emailAddress}
            placeholderTextColor={"#000000"}
            placeholder="Email..."
          />
          {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          {/* Submit button */}
          <View style={styles.fixToText}>
            <Button title="Submit" color={"#000000"} onPress={onSubmitPress} />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 10,
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
  modalView: {
    marginTop: "10%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});
