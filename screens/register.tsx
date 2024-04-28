import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import MainButton from "../components/Buttons";

export default function RegisterScreen() {
  // State management for text inputs
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
  // start the sign up process.
  const { isLoaded, signUp, setActive } = useSignUp();

  const onSignUpPress = async () => {
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
    } catch (err: any) {
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
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        {!pendingVerification && (
        <SafeAreaView style={styles.safeArea}> 
          <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.input}
            onChangeText={(firstName) => setFirstName(firstName)}
            value={firstName}
            placeholder="First Name..."
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(lastName) => setLastName(lastName)}
            value={lastName}
            placeholder="Last Name..."
            placeholderTextColor="#000"
          />
          </View>
          <TextInput
            style={styles.inputLong}
            onChangeText={(email) => setEmailAddress(email)}
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.inputLong}
            onChangeText={(password) => setPassword(password)}
            placeholderTextColor="#000"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputLong}
            //implemtation to check against initially entered password
            onChangeText={(password) => setConfirmPassword(password)}
            placeholderTextColor="#000"
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
          <View style={styles.fixToText}>
            {MainButton("Sign Up", onSignUpPress )}
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
