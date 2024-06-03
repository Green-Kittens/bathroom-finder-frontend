// hooks/useSignOut.js
// hooks/useSignOut.ts
import { useAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";

export const useSignOut = () => {
  const { isLoaded, signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    if (!isLoaded) return;
    signOut();
  }, [isLoaded, signOut]);

  return handleSignOut;
};
