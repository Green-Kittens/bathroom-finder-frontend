import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/stackNavigator";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { ImageProvider } from "./contexts/ImageContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    "EudoxusSans-Regular": require("./assets/fonts/EudoxusSans-Regular.ttf"),
    "EudoxusSans-Bold": require("./assets/fonts/EudoxusSans-Bold.ttf"),
    "EudoxusSans-ExtraBold": require("./assets/fonts/EudoxusSans-ExtraBold.ttf"),
    "EudoxusSans-Light": require("./assets/fonts/EudoxusSans-Light.ttf"),
    "EudoxusSans-ExtraLight": require("./assets/fonts/EudoxusSans-ExtraLight.ttf"),
    "EudoxusSans-Medium": require("./assets/fonts/EudoxusSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const customTextProps = {
    style: {
      fontSize: 16,
      fontFamily: "EudoxusSans-Regular",
      color: "black",
    },
  };

  setCustomText(customTextProps);

  const base64urlDecode = (str: string): string | null => {
    // Replace URL-safe characters with base64 standard characters
    str = str.replace(/-/g, "+").replace(/_/g, "/");

    // Pad the string with '=' characters to make its length a multiple of 4
    while (str.length % 4) {
      str += "=";
    }

    try {
      return atob(str);
    } catch (e) {
      console.error("Decoding failed:", e);
      return null;
    }
  };

  const validateBase64Token = (token: string): boolean => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("Invalid JWT structure.");
        return false;
      }

      const header = base64urlDecode(parts[0]);
      const payload = base64urlDecode(parts[1]);

      if (header && payload) {
        console.log("Decoded header:", header);
        console.log("Decoded payload:", payload);
        return true;
      } else {
        console.error("Invalid base64url token parts.");
        return false;
      }
    } catch (e) {
      console.error("Invalid base64 token:", token, e);
      return false;
    }
  };

  const tokenCache = {
    async getToken(key: string): Promise<string | null> {
      try {
        const token = await SecureStore.getItemAsync(key);
        if (token) {
          console.log(`Token retrieved for key: ${key}`);
          if (validateBase64Token(token)) {
            console.log("Token is a valid base64url encoded string.");
          } else {
            console.error("Token is not a valid base64url encoded string.");
          }
        } else {
          console.log(`No token found for key: ${key}`);
        }
        return token;
      } catch (err) {
        console.error(`Error retrieving token for key: ${key}`, err);
        return null;
      }
    },
    async saveToken(key: string, value: string): Promise<void> {
      try {
        await SecureStore.setItemAsync(key, value);
        console.log(`Token saved for key: ${key}`);
      } catch (err) {
        console.error(`Error saving token for key: ${key}`, err);
      }
    },
    async clearToken(key: string): Promise<void> {
      try {
        await SecureStore.deleteItemAsync(key);
        console.log(`Token cleared for key: ${key}`);
      } catch (err) {
        console.error(`Error clearing token for key: ${key}`, err);
      }
    },
  };

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={"pk_test_ZXhhY3QtZmlzaC00NS5jbGVyay5hY2NvdW50cy5kZXYk"}
    >
      <ImageProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ImageProvider>
    </ClerkProvider>
  );
}
