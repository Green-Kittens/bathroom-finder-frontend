import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { SecondaryButton } from "./Buttons";
import { TextStyle } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return SecondaryButton("Sign in with Google", onPress, false, undefined, {
    fontSize: 14,
  } as TextStyle);
};
export default GoogleSignIn;
