import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { ScreenNavigationProp } from "../navigation/type";
import MainButton from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { useSignIn } from "@clerk/clerk-expo";
import GoogleSignIn from "../components/GoogleSignIn";
import MicroSignIn from "../components/MicroSignIn";
import PasswordInput from "../components/Password";

function TabLoginScreen() {
  // State management for text inputs
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // navigation
  const nav = useNavigation<ScreenNavigationProp>();

  const onSignInPress = async () => {
    if (!isLoaded || !validateFields()) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: unknown) {
      console.log(err);
      setModalMessage(
        "Invalid email or password. \nPlease check your credentials and try again.",
      );
      setModalVisible(true);
    }
  };

  // Validate fields
  const validateFields = () => {
    if (!emailAddress || !password) {
      setValidationError("Please fill out all fields.");
      return false;
    }
    setValidationError("");
    return true;
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

  // Handle last name change and validate
  const handlePasswordChange = (input: string) => {
    setPassword(input);
    validateFields();
  };

  // Close modal
  const onClosePress = () => {
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={onClosePress}
        >
          <TouchableWithoutFeedback onPress={onClosePress}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                {MainButton("Close", onClosePress)}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <ImageBackground
          source={require("../assets/images/boomerang.png")}
          style={{
            width: 753,
            height: 499,
            position: "absolute",
            top: 0,
            left: -200,
          }}
          imageStyle={{
            resizeMode: "cover",
            alignSelf: "flex-end",
          }}
        ></ImageBackground>
        <SafeAreaView style={styles.safeArea}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              value={emailAddress}
              placeholder="Email..."
              placeholderTextColor="#000"
              onChangeText={handleEmailChange}
            />
            <PasswordInput
              label=""
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Password..."
              style={{ width: 200 }}
            />

            <View style={styles.errorContainer}>
              {validationError ? (
                <Text style={styles.errorText}>{validationError}</Text>
              ) : null}
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
          </View>

          {/* Forgot Password Section */}
          <TouchableOpacity
            onPress={() => {
              nav.navigate("ForgotPassword");
            }}
            style={styles.forgotContainer}
          >
            <Text style={styles.text}>Forgot Password</Text>
          </TouchableOpacity>

          {/* Login button */}
          <View style={[{ margin: "10%" }]}>
            {MainButton("Login", onSignInPress)}
          </View>

          {/* Google Sign In */}
          <View style={[{ margin: "10%", flexDirection: "row" }]}>
            <GoogleSignIn />
            <MicroSignIn />
          </View>
        </SafeAreaView>

        {/* Footer with Register Section */}
        <View style={styles.footer}>
          <View style={styles.registerContainer}>
            <Text style={styles.text} disabled>
              Don&apos;t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("Register");
              }}
              style={styles.registerContainer}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TabLoginScreen;

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
  },
  // Title Section
  title: {
    fontSize: 20,
    marginBottom: 50,
    marginTop: 20,
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
  // Input Container Section
  inputContainer: {
    alignItems: "center",
  },
  // Text Section
  text: {
    alignSelf: "center",
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
    backgroundColor: "none",
  },
  // Register Section
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },
  // Register Section
  forgotContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },
  // Register Text
  registerText: {
    color: "black",
    fontFamily: "EudoxusSans-Bold",
  },
  // Logo
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: "20%",
    marginBottom: 5,
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
    flexDirection: "row",
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
