import React, { useState } from "react";
import {
  Modal,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MainButton from "../components/Buttons";
import { useSignIn } from "@clerk/clerk-react"; // Import the appropriate hook
import { SignInFirstFactor, EmailCodeFactor } from "@clerk/types";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../navigation/type";

const EmailCodeSignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn(); // This might need to be adapted based on how you initialize Clerk
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigation<ScreenNavigationProp>();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      // Create a sign-in attempt with the user's email
      if (signIn) {
        // Start the Sign Up process using the email number method
        const { supportedFirstFactors } = await signIn.create({
          identifier: email,
        });

        // Filter the returned array to find the 'phone_code' entry
        const isEmailCodeFactor = (
          factor: SignInFirstFactor,
        ): factor is EmailCodeFactor => {
          return factor.strategy === "email_code";
        };
        const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

        if (emailCodeFactor) {
          // Grab the emailNumberId
          const { emailAddressId } = emailCodeFactor;

          // Send the OTP code to the user
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId,
          });
          setShowCodeInput(true);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Failed to send email: " + err.message);
      } 
    }
  };

  const handleCodeSubmit = async () => {
    if (!code) {
      setError("Please enter the code you received.");
      return;
    }

    try {
      // Complete the sign-in process by verifying the code
      if (signIn) {
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code,
        });
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          setModalVisible(false); // Close modal on successful verification
          setEmail("");
          setCode("");
          setShowCodeInput(false);
          nav.navigate("Main");
        } else {
          setError("Invalid code. Please try again.");
        }
      }
    } catch (err) {
      if (err instanceof Error) setError("Verification failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      {MainButton("Email Code Login", () => setModalVisible(true))}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View>
                  {!showCodeInput ? (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Email..."
                        placeholderTextColor={"#000"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      {error ? <Text style={styles.error}>{error}</Text> : null}
                      {MainButton("Submit Email", handleEmailSubmit)}
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Code..."
                        placeholderTextColor={"#000"}
                        value={code}
                        onChangeText={setCode}
                        keyboardType="numeric"
                      />
                      {error ? <Text style={styles.error}>{error}</Text> : null}
                      {MainButton("Verify Code", handleCodeSubmit)}
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default EmailCodeSignIn;
