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
} from "react-native";
import { ScreenNavigationProp } from "../navigation/type";
import MainButton from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { useSignIn } from "@clerk/clerk-expo";
import GoogleSignIn from "../components/GoogleSignIn";
import MicroSignIn from "../components/MicroSignIn";

function TabLoginScreen() {
  // State management for text inputs
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);

  // navigation
  const nav = useNavigation<ScreenNavigationProp>();

  const onSignInPress = async () => {
    if (!isLoaded) {
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
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
              onChangeText={setEmailAddress}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                style={styles.passwordInput}
                placeholder="Password..."
                placeholderTextColor="#000"
                secureTextEntry={!isPasswordVisible}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>
                  {isPasswordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
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
  // Password Section
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    width: "80%",
    height: 40,
    backgroundColor: "#FFFFFF",
    maxWidth: 200,
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
    marginBottom: 5,
  },
});
