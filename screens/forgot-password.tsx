import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  Modal,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { enableScreens } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../navigation/type";
import PasswordInput from "../components/Password";
import PasswordStrengthMeter from "../components/PasswordMeter";

// Enable native screens for better performance
enableScreens();

export default function TabSubmitScreen() {
  // State management for text inputs
  const [emailAddress, setEmailAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = React.useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const [modalMessage, setModalMessage] = useState("");
  const navigation = useNavigation<ScreenNavigationProp>();

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmitPress = async () => {
    if (emailRegex.test(emailAddress)) {
      setEmailError("");
      try {
        await onRequestReset();
        setModalMessage(`Email has been sent to ${emailAddress}`);
      } catch (err: unknown) {
        setModalMessage(
          "Error occured, please try again. \nCheck if the email is asociated with an account.",
        );
        setModalVisible(true);
        /* console.error("Error caught in onSubmitPress:", err); */
      } finally {
        setModalVisible(true);
      }
    } else {
      setEmailError("Please enter a valid email address.");
      setModalMessage("Invalid Email Address");
      setModalVisible(true);
    }
  };

  const onClosePress = async () => {
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
    validateFields();
  };

  // Request a password reset code by email
  const onRequestReset = async () => {
    if (signIn) {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      setModalMessage("Password reset successfully");
      setModalVisible(true);
      navigation.navigate("Main");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: unknown) {
      /* console.error("Error in onReset:", err); */
      setModalMessage(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setModalVisible(true);
    }
  };

  // Validate fields
  const validateFields = () => {
    if (!password) {
      setValidationError("Please complete the form.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    validateFields();
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setModalVisible(false);
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
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
              <View style={styles.modalOverlay}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                  <Text style={styles.text}>{modalMessage}</Text>
                  <Button
                    title="Close"
                    color={"#000000"}
                    onPress={onClosePress}
                  />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Forgot-Password</Text>
          {!successfulCreation && (
            <>
              {/* Text input fields */}
              <TextInput
                style={styles.input}
                onChangeText={handleEmailChange}
                value={emailAddress}
                placeholderTextColor={"#000000"}
                placeholder="Email..."
              />
              <View style={styles.errorContainer}>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>
              {/* Submit button */}
              <View style={styles.fixToText}>
                <Button
                  title="Submit"
                  color={"#000000"}
                  onPress={onSubmitPress}
                />
              </View>
            </>
          )}
          {successfulCreation && (
            <>
              <View>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  style={styles.input}
                  onChangeText={setCode}
                  placeholderTextColor={"#000000"}
                />
                <PasswordStrengthMeter password={password} />
                <PasswordInput
                  label=""
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="New Password..."
                  style={{ width: 200 }}
                />
              </View>
              <View style={styles.errorContainer}>
                {validationError ? (
                  <Text style={styles.errorText}>{validationError}</Text>
                ) : null}
              </View>
              <Button
                onPress={onReset}
                title="Set new Password"
                color={"#6c47ff"}
              ></Button>
            </>
          )}
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
    marginTop: "25%",
  },
  // Title Section
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 50,
  },
  // Input Section
  input: {
    height: 40,
    width: 200, // Control the width of the input size
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  // Error Container Section
  errorContainer: {
    alignSelf: "center",
  },
});
