import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import MainButton from "../components/Buttons";
import PasswordStrengthMeter from "../components/PasswordMeter";
import PasswordInput from "../components/Password";
import useEmailValidation from "../hooks/useEmailValidation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
  // State management for text inputs
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const { validateEmail } = useEmailValidation();

  // start the sign up process.
  const { isLoaded, signUp, setActive } = useSignUp();

  // This function is called when the user presses the sign up button.
  const onSignUpPress = async () => {
    if (!passwordMatch || !validateFields()) {
      return;
    }
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: unknown) {
      const errorMessage = JSON.parse(JSON.stringify(err, null, 2)).errors[0]
        .message;
      setValidationError(errorMessage);
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: unknown) {
      const errorMessage = JSON.parse(JSON.stringify(err, null, 2)).errors[0]
        .message;
      setValidationError(errorMessage);
    }
  };

  // Validate fields
  const validateFields = () => {
    let valid = true;

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !password ||
      !confirmPassword
    ) {
      setValidationError("Please fill out all fields.");
      valid = false;
    } else {
      setValidationError("");
    }

    if (!isPasswordStrong) {
      if (password === "") {
        setPasswordError("");
      } else {
        setPasswordError("Password is not strong enough.");
        valid = false;
      }
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setPasswordMatch(false);
      setValidationError("Passwords do not match.");
      valid = false;
    } else {
      setPasswordMatch(true);
    }

    setButtonDisabled(!valid);
    return valid;
  };

  // Handle field value changes and validate
  const handleFirstNameChange = (input: string) => {
    setFirstName(input);
  };

  const handleLastNameChange = (input: string) => {
    setLastName(input);
  };

  const handlePasswordStrengthChange = (isStrong: boolean) => {
    setIsPasswordStrong(isStrong);
  };

  const handleEmailChange = (input: string) => {
    setEmailAddress(input);
    if (input === "") {
      setEmailError("");
    } else if (!validateEmail(input)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    setPasswordMatch(input === confirmPassword);
    if (input.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
      setPasswordMatch(input === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
    setPasswordMatch(input === password);
  };

  useEffect(() => {
    validateFields();
  }, [
    password,
    confirmPassword,
    firstName,
    lastName,
    emailAddress,
    isPasswordStrong,
  ]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/blob.png")}
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
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View>
              <Text style={styles.title}>Register</Text>
              {!pendingVerification && (
                <SafeAreaView style={styles.safeArea}>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleFirstNameChange}
                      value={firstName}
                      placeholder="First Name..."
                      placeholderTextColor="#000"
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={handleLastNameChange}
                      value={lastName}
                      placeholder="Last Name..."
                      placeholderTextColor="#000"
                    />
                  </View>
                  <TextInput
                    style={styles.inputLong}
                    onChangeText={handleEmailChange}
                    value={emailAddress}
                    placeholder="Email..."
                    placeholderTextColor="#000"
                  />
                  {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                  <PasswordStrengthMeter
                    password={password}
                    onPasswordStrengthChange={handlePasswordStrengthChange}
                  />
                  <PasswordInput
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder="Password..."
                  />
                  <PasswordInput
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    placeholder="Confirm Password..."
                  />
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{passwordError}</Text>
                    {validationError ? (
                      <Text style={styles.errorText}>{validationError}</Text>
                    ) : null}
                  </View>
                  <View style={styles.fixToText}>
                    {MainButton("Sign Up", onSignUpPress, buttonDisabled)}
                  </View>
                </SafeAreaView>
              )}
              {pendingVerification && (
                <SafeAreaView style={styles.container}>
                  <View>
                    <TextInput
                      style={styles.input}
                      value={code}
                      placeholder="Code..."
                      placeholderTextColor={"#000"}
                      onChangeText={(code) => setCode(code)}
                    />
                  </View>
                  {validationError ? (
                    <Text style={styles.errorText}>{validationError}</Text>
                  ) : null}
                  {MainButton("Verify Email", onPressVerify)}
                </SafeAreaView>
              )}
            </View>
          </ScrollView>
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
    marginTop: 20,
  },
  // Title Section
  title: {
    fontSize: 24,
    fontFamily: "EudoxusSans-Bold",
    alignSelf: "center",
  },
  // Input Section
  input: {
    height: 40,
    width: "20%", // Control the width of the input size
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    minWidth: 150,
  },
  // Input Section
  inputLong: {
    height: 40,
    width: "30%", // Control the width of the input size
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    minWidth: 325,
  },
  // Text Section
  text: {
    alignSelf: "center",
  },
  // Button Section
  fixToText: {
    marginTop: 10,
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
  // Password Strength Section
  strengthContainer: {
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
  },
  // Password Strength Text Section
  strengthText: {
    alignSelf: "center",
    color: "white",
    padding: 5,
    fontSize: 18,
  },
  // Password Feedback Section
  feedback: {
    fontSize: 16,
    fontFamily: "EudoxusSans-Regular",
    color: "black",
    padding: 5,
  },
  // Error Text Section
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
  // Icon Section
  icon: {
    alignContent: "center",
    marginTop: 5,
    marginRight: 5,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleButtonText: {
    color: "black",
  },
  passwordInput: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    height: 40,
    backgroundColor: "#FFFFFF",
    maxWidth: 200,
    paddingTop: 10,
    minWidth: 325,
  },
});
