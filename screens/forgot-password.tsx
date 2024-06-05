import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Modal,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { enableScreens } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../navigation/type";
import MainButton from "../components/Buttons";
import PasswordInput from "../components/Password";
import PasswordStrengthMeter from "../components/PasswordMeter";
import useEmailValidation from "../hooks/useEmailValidation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Enable native screens for better performance
enableScreens();

export default function TabSubmitScreen() {
  // State management for text inputs
  const [emailAddress, setEmailAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const [modalMessage, setModalMessage] = useState("");
  const navigation = useNavigation<ScreenNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { validateEmail } = useEmailValidation();

  const onSubmitPress = async () => {
    if (validateEmail(emailAddress)) {
      setEmailError("");
      try {
        await onRequestReset();
        setModalMessage(`Email has been sent to ${emailAddress}`);
        setSuccessfulCreation(true);
      } catch (err: unknown) {
        const errorMessage = JSON.parse(JSON.stringify(err, null, 2)).errors[0]
          .message;
        setModalMessage(errorMessage);
        setModalVisible(true);
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
      setModalMessage("Password reset successfully");
      setModalVisible(true);
      navigation.navigate("Main");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: unknown) {
      const errorMessage = JSON.parse(JSON.stringify(err, null, 2)).errors[0]
        .message;
      setModalMessage(errorMessage);
      setModalVisible(true);
    }
  };

  // Validate fields
  const validateFields = () => {
    if (
      password.length >= 8 &&
      validateEmail(emailAddress) &&
      code &&
      isPasswordStrong
    ) {
      setButtonDisabled(false);
      setValidationError("");
      return true;
    }
    setButtonDisabled(true);
    return false;
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    if (input === "") {
      setValidationError("");
      setButtonDisabled(true);
    } else if (input.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
      setValidationError("");
    }
    validateFields();
  };

  const handlePasswordStrengthChange = (isStrong: boolean) => {
    setIsPasswordStrong(isStrong);
    validateFields();
  };

  // Handle email change and validation
  const handleEmailChange = (input: string) => {
    setEmailAddress(input);
    if (!successfulCreation) {
      if (validateEmail(input)) {
        setEmailError("");
        setButtonDisabled(false);
      } else {
        setEmailError("Please enter a valid email address.");
        setButtonDisabled(true);
      }
    } else {
      validateFields();
    }
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  useEffect(() => {
    if (successfulCreation) {
      validateFields();
    }
  }, [emailAddress, password, code, isPasswordStrong]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/circle.png")}
        style={{
          top: 300,
          left: -200,
          flex: 1,
          justifyContent: "center",
          width: 500,
          height: 466,
          position: "absolute",
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    {MainButton("Close", onClosePress)}
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.text}>
              Enter your email below for a password reset link.
            </Text>
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
                  {MainButton("Submit", onSubmitPress, buttonDisabled)}
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
                  <PasswordStrengthMeter
                    password={password}
                    onPasswordStrengthChange={handlePasswordStrengthChange}
                  />
                  <PasswordInput
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
                {MainButton("Submit", onReset, buttonDisabled)}
              </>
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
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
