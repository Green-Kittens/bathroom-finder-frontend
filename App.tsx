import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/stackNavigator";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { ImageProvider } from "./contexts/ImageContext";
import { enableScreens } from "react-native-screens";

export default function App() {
  const [fontsLoaded] = useFonts({
    "EudoxusSans-Regular": require("./assets/fonts/EudoxusSans-Regular.ttf"),
    "EudoxusSans-Bold": require("./assets/fonts/EudoxusSans-Bold.ttf"),
    "EudoxusSans-ExtraBold": require("./assets/fonts/EudoxusSans-ExtraBold.ttf"),
    "EudoxusSans-Light": require("./assets/fonts/EudoxusSans-Light.ttf"),
    "EudoxusSans-ExtraLight": require("./assets/fonts/EudoxusSans-ExtraLight.ttf"),
    "EudoxusSans-Medium": require("./assets/fonts/EudoxusSans-Medium.ttf"),
  });

  enableScreens();

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

  const tokenCache = {
    async getToken(key: string): Promise<string | null> {
      try {
        const token = await SecureStore.getItemAsync(key);
        return token;
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string): Promise<void> {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
    async clearToken(key: string): Promise<void> {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (err) {
        return;
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
