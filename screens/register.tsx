import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  Modal,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

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

  const [modalVisible, setModalVisible] = React.useState(false);

  const onSubmitPress = () => {
    // Placeholder for navigation logic
    setModalVisible(true);
  };

  const onClosePress = () => {
    // Placeholder for navigation logic
    setModalVisible(false);
  };

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
        {!pendingVerification && (
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name..."
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name..."
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmailAddress}
            value={emailAddress}
            placeholder="Email..."
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            //implemtation to check against initially entered password
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
          <View style={styles.fixToText}>
            <Button
              title="Register"
              color={"#000000"}
              onPress={onSignUpPress}
            />
          </View>
        </SafeAreaView>
        )};
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
    justifyContent: "center",
  },
  // Title Section
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
