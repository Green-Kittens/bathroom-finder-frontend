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
  ImageBackground
} from "react-native";
import MainButton from "../../components/Buttons";

const circleimage = { uri: "/assets/images/circle.png" };

export default function TabSubmitScreen() {
  // State management for text inputs
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmitPress = () => {
    // Placeholder for navigation logic
    setModalVisible(true);
  };

  const onClosePress = () => {
    // Placeholder for navigation logic
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/circle.png")}
        style={{
          top: 0,
          left: -100,
          flex: 1,
          justifyContent: "center",
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      >
      </ImageBackground>
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
            <Text style={styles.text}>Email has been sent to {email}</Text>
            {MainButton("Close", onClosePress)}
          </View>
        </Modal>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.text}>
          Enter your email below for a password reset link.
        </Text>
        {/* Text input fields */}
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email:"
        />

        {/* Submit button */}
        <View style={styles.fixToText}>
          {MainButton("Submit", onSubmitPress)}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#EEF8F7",
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
    marginBottom: 50,
    fontFamily: "EudoxusSans-Bold",
  },
  // Input Section
  input: {
    height: 40,
    width: "30%", // Control the width of the input size
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    minWidth: 200,
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
    borderRadius: 50,
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
});
