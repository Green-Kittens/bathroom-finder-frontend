import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import MainButton from "../components/Buttons";
import PasswordStrengthMeter from "../components/PasswordMeter";
import PasswordInput from "../components/Password";

export default function RegisterScreen() {
  // State management for text inputs
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(true);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  // start the sign up process.
  const { isLoaded, signUp, setActive } = useSignUp();

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      console.error(JSON.stringify(err, null, 2));
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
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Validate fields
  const validateFields = () => {
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !password ||
      !confirmPassword
    ) {
      setValidationError("Please fill out all fields.");
      return false;
    }
    setValidationError("");
    return true;
  };

  // Handle field value changes and validate
  const handleFirstNameChange = (input: string) => {
    setFirstName(input);
    validateFields();
  };
  // Handle last name change and validate
  const handleLastNameChange = (input: string) => {
    setLastName(input);
    validateFields();
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

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    setPasswordMatch(input === confirmPassword);
    validateFields();
  };

  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
    setPasswordMatch(input === password);
    validateFields();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <PasswordStrengthMeter password={password} />
            <PasswordInput
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Password..."
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm Password..."
            />
            <View style={styles.errorContainer}>
              {!passwordMatch && (
                <Text style={styles.errorText}>Passwords do not match</Text>
              )}
              {validationError ? (
                <Text style={styles.errorText}>{validationError}</Text>
              ) : null}
            </View>
            <View style={styles.fixToText}>
              {MainButton("Sign Up", onSignUpPress)}
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
            {MainButton("Verify Email", onPressVerify)}
          </SafeAreaView>
        )}
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
    marginTop: 50,
  },
  // Title Section
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
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
    flexDirection: "row",
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
