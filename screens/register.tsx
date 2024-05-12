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
import zxcvbn, { ZXCVBNResult } from "zxcvbn";
import Ionicons from "@expo/vector-icons/Ionicons";

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
  const [strength, setStrength] = React.useState<ZXCVBNResult | null>(null);
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

  // Check password strength
  const checkPasswordStrength = (input: string) => {
    setPassword(input);
    if (input === "") {
      setStrength(null);
    } else {
      const result = zxcvbn(input);
      setStrength(result);
    }
    setPasswordMatch(input === confirmPassword);
    validateFields();
  };

  // Get color and text based on password strength score
  const getStrengthFeedback = (score: number) => {
    switch (score) {
      case 0:
        return {
          text: "Very Weak",
          color: "red",
          icon: "close-circle" as const,
        };
      case 1:
        return { text: "Weak", color: "orange", icon: "alert" as const };
      case 2:
        return {
          text: "Fair",
          color: "#DBBD40",
          icon: "remove-circle" as const,
        };
      case 3:
        return { text: "Good", color: "#8FDB00", icon: "add-circle" as const };
      case 4:
        return {
          text: "Strong",
          color: "green",
          icon: "checkmark-circle" as const,
        };
      default:
        return { text: "Unknown", color: "gray", icon: "help-circle" as const };
    }
  };
  // Custom feedback based on zxcvbn result
  const getCustomFeedback = (result: ZXCVBNResult) => {
    if (result.score === 0) return "Try adding more characters.";
    if (result.score === 1) return "Try adding numbers or symbols.";
    if (result.score === 2) return "Try adding more words or capital letters.";
    if (result.score === 3) return "Try adding more characters or symbols.";
    if (result.score === 4) return "Password is strong!";
    return "undefined";
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
  // Handle confirm password change and validate
  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
    setPasswordMatch(input === password);
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
            {strength && (
              <>
                <View
                  style={{
                    ...styles.strengthContainer,
                    backgroundColor: getStrengthFeedback(strength.score).color,
                  }}
                >
                  <Text style={styles.strengthText}>
                    {getStrengthFeedback(strength.score).text}
                  </Text>
                  <Ionicons
                    name={getStrengthFeedback(strength.score).icon}
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.feedback}>
                  {getCustomFeedback(strength)}
                </Text>
              </>
            )}
            <TextInput
              style={styles.inputLong}
              onChangeText={checkPasswordStrength}
              placeholderTextColor="#000"
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
            />
            <TextInput
              style={styles.inputLong}
              //implemtation to check against initially entered password
              onChangeText={handleConfirmPasswordChange}
              placeholderTextColor="#000"
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={true}
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
    width: "40%", // Control the width of the input size
    margin: 5,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
  },
  // Input Section
  inputLong: {
    height: 40,
    width: "82%", // Control the width of the input size
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
});
